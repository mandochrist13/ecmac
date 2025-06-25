import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'galerie';

/**
 * @openapi
 * /api/galerie:
 *   get:
 *     summary: Récupère toutes les images de la galerie
 *     tags:
 *       - Galerie
 *     responses:
 *       200:
 *         description: Liste des images de la galerie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   imageUrl:
 *                     type: string
 *                   description:
 *                     type: string
 *                     nullable: true
 *       500:
 *         description: Erreur serveur
 */
export async function GET() {
  try {
    const galeries = await prisma.galerie.findMany({
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(galeries, { status: 200 });
  } catch (error) {
    console.error("Erreur GET Galerie :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/galerie:
 *   post:
 *     summary: Ajoute une image à la galerie
 *     tags:
 *       - Galerie
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image à uploader
 *               description:
 *                 type: string
 *                 description: Description optionnelle de l'image
 *     responses:
 *       201:
 *         description: Image ajoutée avec succès
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
 *         description: Requête mal formée (ex: pas de fichier)
 *       500:
 *         description: Erreur serveur
 */

//Post 1 galerie
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { erreur: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('imageUrl');
    const description = formData.get('description');

    if (!file) {
      return NextResponse.json({ error: 'Le fichier image est requis' }, { status: 400 });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `galerie/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error("Erreur upload image galerie :", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      return NextResponse.json({ error: "Impossible d'obtenir l'URL publique" }, { status: 500 });
    }

    const nouvelleImage = await prisma.galerie.create({
      data: {
        imageUrl: urlData.publicUrl,
        description: description || null,
      },
    });

    return NextResponse.json(nouvelleImage, { status: 201 });
  } catch (error) {
    console.error("Erreur POST Galerie :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de l'image" }, { status: 500 });
  }
}
