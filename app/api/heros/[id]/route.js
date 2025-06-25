import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'hero'; // bucket Supabase Storage

/**
 * @openapi
 * /api/hero/{id}:
 *   get:
 *     summary: Récupère un héros par ID
 *     tags:
 *       - Hero
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du héros
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Héros trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titre:
 *                   type: string
 *                 sousTitre:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Héros non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const hero = await prisma.hero.findUnique({ where: { id } });
    if (!hero) return NextResponse.json({ error: "Héros non trouvé" }, { status: 404 });
    return NextResponse.json(hero, { status: 200 });
  } catch (error) {
    console.error("Erreur GET Hero par ID:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/hero/{id}:
 *   put:
 *     summary: Met à jour un héros (titre, sousTitre et/ou image)
 *     tags:
 *       - Hero
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du héros à modifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Données à mettre à jour (multipart/form-data)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               sousTitre:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Nouvelle image (optionnelle)
 *     responses:
 *       200:
 *         description: Héros mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Héros non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request, context) {
  const id = Number(context.params?.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }


  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Le contenu doit être multipart/form-data' }, { status: 400 });
    }

    const formData = await request.formData();
    const titre = formData.get('titre') || null;
    const sousTitre = formData.get('sousTitre') || null;
    const file = formData.get('imageUrl') || null;

    const hero = await prisma.hero.findUnique({ where: { id } });
    if (!hero) return NextResponse.json({ error: "Héros non trouvé" }, { status: 404 });

    let imageUrl = hero.imageUrl;

    if (file) {
      // Supprimer l'ancienne image
      try {
        const url = new URL(hero.imageUrl);
        const filePath = url.pathname.split('/storage/v1/object/public/')[1];
        if (filePath) {
          const { error } = await supabase.storage.from(bucket).remove([filePath]);
          if (error) console.warn("Erreur suppression ancienne image:", error);
        }
      } catch {
        console.warn("Impossible d'extraire le chemin pour suppression");
      }

      // Upload nouvelle image
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `hero/${fileName}`;

      const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        console.error("Erreur upload nouvelle image hero :", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      if (!urlData?.publicUrl) {
        return NextResponse.json({ error: "Impossible d'obtenir l'URL publique" }, { status: 500 });
      }
      imageUrl = urlData.publicUrl;
    }

    const updatedHero = await prisma.hero.update({
      where: { id },
      data: {
        ...(titre ? { titre } : {}),
        ...(sousTitre ? { sousTitre } : {}),
        imageUrl,
      },
    });

    return NextResponse.json(updatedHero, { status: 200 });
  } catch (error) {
    console.error("Erreur PUT Hero :", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/hero/{id}:
 *   delete:
 *     summary: Supprime un héros (base + fichier Supabase)
 *     tags:
 *       - Hero
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du héros à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Héros supprimé avec succès
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
 *         description: Héros non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const hero = await prisma.hero.findUnique({ where: { id } });
    if (!hero) return NextResponse.json({ error: "Héros non trouvé" }, { status: 404 });

    // Supprimer l'image Supabase
    try {
      const url = new URL(hero.imageUrl);
      const filePath = url.pathname.split('/storage/v1/object/public/')[1];
      if (filePath) {
        const { error } = await supabase.storage.from(bucket).remove([filePath]);
        if (error) console.error("Erreur suppression fichier Supabase :", error);
      }
    } catch {
      console.warn("Impossible d'extraire le chemin du fichier à supprimer");
    }

    // Supprimer en base
    await prisma.hero.delete({ where: { id } });

    return NextResponse.json({ message: "Héros supprimé" }, { status: 200 });
  } catch (error) {
    console.error("Erreur DELETE Hero :", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
