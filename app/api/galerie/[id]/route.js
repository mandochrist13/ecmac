import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'galerie';

/**
 * @openapi
 * /api/galerie/{id}:
 *   get:
 *     summary: Récupérer une image de la galerie par ID
 *     tags:
 *       - Galerie
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'image
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 imageUrl:
 *                   type: string
 *                 description:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Image non trouvée
 *       500:
 *         description: Erreur serveur
 */

export async function GET(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const image = await prisma.galerie.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json({ error: 'Image non trouvée' }, { status: 404 });
    }
    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    console.error("Erreur GET Galerie par ID :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


/**
 * @openapi
 * /api/galerie/{id}:
 *   put:
 *     summary: Met à jour la description d'une image de la galerie
 *     tags:
 *       - Galerie
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'image à modifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nouvelle description de l'image
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image mise à jour avec succès
 *       400:
 *         description: Requête invalide ou description manquante
 *       500:
 *         description: Erreur serveur
 */

//PUT image g
export async function PUT(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('imageUrl');
    const description = formData.get('description');

    if (!file) {
      return NextResponse.json({ error: 'Fichier image requis' }, { status: 400 });
    }

    // 1. Récupérer l'image existante
    const imageExistante = await prisma.galerie.findUnique({ where: { id } });
    if (!imageExistante) {
      return NextResponse.json({ error: 'Image non trouvée' }, { status: 404 });
    }

    // 2. Supprimer l'ancien fichier de Supabase
    const url = new URL(imageExistante.imageUrl);
    const oldPath = url.pathname.split('/storage/v1/object/public/')[1];
    if (oldPath) {
      await supabase.storage.from(bucket).remove([oldPath]);
    }

    // 3. Uploader le nouveau fichier
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `galerie/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error("Erreur upload :", uploadError);
      return NextResponse.json({ error: 'Erreur upload fichier' }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

    // 4. Mise à jour de la base de données
    const updated = await prisma.galerie.update({
      where: { id },
      data: {
        imageUrl: urlData.publicUrl,
        description: description || null,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Erreur PUT Galerie :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/galerie/{id}:
 *   delete:
 *     summary: Supprime une image de la galerie (base + fichier Supabase)
 *     tags:
 *       - Galerie
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'image à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Image non trouvée
 *       500:
 *         description: Erreur serveur
 */


export async function DELETE(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const image = await prisma.galerie.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json({ error: 'Image non trouvée' }, { status: 404 });
    }

    const url = new URL(image.imageUrl);
    const filePath = url.pathname.includes('/storage/v1/object/public/')
      ? url.pathname.split('/storage/v1/object/public/')[1]
      : null;

    if (filePath) {
      const { error } = await supabase.storage.from(bucket).remove([filePath]);
      if (error) {
        console.error("Erreur suppression fichier Supabase :", error);
      }
    } else {
      console.warn("Impossible d'extraire le chemin du fichier à supprimer");
    }

    await prisma.galerie.delete({ where: { id } });

    return NextResponse.json({ message: "Image supprimée" }, { status: 200 });
  } catch (error) {
    console.error("Erreur DELETE Galerie :", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

