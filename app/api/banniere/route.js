import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'bannieres'; // Bucket pour les fichiers bannières

/**
 * @openapi
 * /api/banniere:
 *   get:
 *     summary: Récupère toutes les bannières actives (triées par ordre)
 *     tags:
 *       - Banniere
 *     responses:
 *       200:
 *         description: Liste des bannières
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Banniere'
 *       500:
 *         description: Erreur serveur
 */
export async function GET() {
  try {
    const bannières = await prisma.banniere.findMany({
      where: { actif: true },
      orderBy: { ordre: 'asc' },
    });
    return NextResponse.json(bannières, { status: 200 });
  } catch (error) {
    console.error('Erreur GET Banniere :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/banniere:
 *   post:
 *     summary: Crée une nouvelle bannière avec image
 *     tags:
 *       - Banniere
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - image
 *             properties:
 *               titre:
 *                 type: string
 *               sousTitre:
 *                 type: string
 *               lien:
 *                 type: string
 *                 format: uri
 *               ordre:
 *                 type: integer
 *               actif:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image de la bannière
 *     responses:
 *       201:
 *         description: Bannière créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banniere'
 *       400:
 *         description: Champs obligatoires manquants
 *       500:
 *         description: Erreur serveur
 */
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
    }

    const formData = await request.formData();

    const titre = formData.get('titre');
    const sousTitre = formData.get('sousTitre');
    const lien = formData.get('lien');
    const ordre = formData.get('ordre') ? parseInt(formData.get('ordre')) : 0;
    const actif = formData.get('actif') === 'false' ? false : true;
    const file = formData.get('image');

    if (!titre || !file) {
      return NextResponse.json({ error: 'Titre et image sont requis' }, { status: 400 });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `banniere/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Erreur upload image:', uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    const imageUrl = urlData?.publicUrl;

    if (!imageUrl) {
      return NextResponse.json({ error: "Impossible d'obtenir l'URL de l'image" }, { status: 500 });
    }

    const banniere = await prisma.banniere.create({
      data: {
        titre,
        sousTitre: sousTitre || null,
        lien: lien || null,
        ordre: isNaN(ordre) ? 0 : ordre,
        actif,
        imageUrl,
      },
    });

    return NextResponse.json(banniere, { status: 201 });

  } catch (error) {
    console.error('Erreur POST Banniere :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
