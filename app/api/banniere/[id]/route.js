import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'bannieres';

/**
 * @openapi
 * /api/banniere/{id}:
 *   get:
 *     summary: Récupère une bannière par ID
 *     tags:
 *       - Banniere
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la bannière
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banniere'
 *       404:
 *         description: Bannière non trouvée
 */
export async function GET(request, context) {
  const id = Number(context.params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  const banniere = await prisma.banniere.findUnique({ where: { id } });

  if (!banniere) {
    return NextResponse.json({ error: "Bannière non trouvée" }, { status: 404 });
  }

  return NextResponse.json(banniere, { status: 200 });
}

/**
 * @openapi
 * /api/banniere/{id}:
 *   put:
 *     summary: Met à jour une bannière (image facultative)
 *     tags:
 *       - Banniere
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               sousTitre:
 *                 type: string
 *               lien:
 *                 type: string
 *               ordre:
 *                 type: integer
 *               actif:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Bannière mise à jour
 *       404:
 *         description: Bannière non trouvée
 */
export async function PUT(request, context) {
  const id = Number(context.params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  const banniere = await prisma.banniere.findUnique({ where: { id } });
  if (!banniere) return NextResponse.json({ error: "Bannière non trouvée" }, { status: 404 });

  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  const formData = await request.formData();
  const titre = formData.get('titre');
  const sousTitre = formData.get('sousTitre');
  const lien = formData.get('lien');
  const ordre = formData.get('ordre') ? parseInt(formData.get('ordre')) : undefined;
  const actif = formData.get('actif') === 'false' ? false : true;
  const file = formData.get('image');

  let imageUrl = banniere.imageUrl;

  if (file && file.name) {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `banniere/${fileName}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    if (!urlData?.publicUrl) {
      return NextResponse.json({ error: "Impossible d'obtenir l'URL" }, { status: 500 });
    }

    imageUrl = urlData.publicUrl;
  }

  const updated = await prisma.banniere.update({
    where: { id },
    data: {
      ...(titre && { titre }),
      sousTitre,
      lien,
      ordre,
      actif,
      imageUrl,
    },
  });

  return NextResponse.json(updated, { status: 200 });
}

/**
 * @openapi
 * /api/banniere/{id}:
 *   delete:
 *     summary: Supprime une bannière et son image
 *     tags:
 *       - Banniere
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bannière supprimée
 *       404:
 *         description: Non trouvée
 */
export async function DELETE(request, context) {
  const id = Number(context.params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  const banniere = await prisma.banniere.findUnique({ where: { id } });
  if (!banniere) return NextResponse.json({ error: "Bannière non trouvée" }, { status: 404 });

  try {
    const path = banniere.imageUrl.split('/storage/v1/object/public/')[1];
    if (path) {
      await supabase.storage.from(bucket).remove([path]);
    }
  } catch (e) {
    console.warn("Erreur suppression image:", e);
  }

  await prisma.banniere.delete({ where: { id } });

  return NextResponse.json({ message: "Bannière supprimée" }, { status: 200 });
}
