import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'hero';

/**
 * @openapi
 * /api/hero:
 *   get:
 *     summary: Récupère tous les héros
 *     tags:
 *       - Hero
 *     responses:
 *       200:
 *         description: Liste des héros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titre:
 *                     type: string
 *                   sousTitre:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */
export async function GET() {
  try {
    const heros = await prisma.hero.findMany({
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(heros, { status: 200 });
  } catch (error) {
    console.error("Erreur GET Hero :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/hero:
 *   post:
 *     summary: Ajoute un héros avec image
 *     tags:
 *       - Hero
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - titre
 *               - sousTitre
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image du héros
 *               titre:
 *                 type: string
 *                 description: Titre du héros
 *               sousTitre:
 *                 type: string
 *                 description: Sous-titre du héros
 *     responses:
 *       201:
 *         description: Héros créé avec succès
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
 *         description: Requête invalide (champs manquants)
 *       500:
 *         description: Erreur serveur
 */
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { erreur: 'Le contenu doit être multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('imageUrl');
    const titre = formData.get('titre');
    const sousTitre = formData.get('sousTitre');

    if (!file || !titre || !sousTitre) {
      return NextResponse.json({ error: 'Image, titre et sousTitre sont requis' }, { status: 400 });
    }

    // Construire un nom de fichier unique
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `hero/${fileName}`;

    // Upload vers Supabase Storage
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error("Erreur upload image hero :", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Récupérer l'URL publique
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      return NextResponse.json({ error: "Impossible d'obtenir l'URL publique" }, { status: 500 });
    }

    // Création de l'entrée en base
    const newHero = await prisma.hero.create({
      data: {
        titre,
        sousTitre,
        imageUrl: urlData.publicUrl,
      },
    });

    return NextResponse.json(newHero, { status: 201 });
  } catch (error) {
    console.error("Erreur POST Hero :", error);
    return NextResponse.json({ error: "Erreur lors de la création du héros" }, { status: 500 });
  }
}
