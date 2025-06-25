import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'preinscriptions';

/**
 * @openapi
 * /api/preinscription/{id}:
 *   get:
 *     summary: Récupère une préinscription par ID
 *     tags:
 *       - Preinscription
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la préinscription
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Préinscription trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preinscription'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Préinscription non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const preinscription = await prisma.preinscription.findUnique({ where: { id } });
    if (!preinscription) return NextResponse.json({ error: "Préinscription non trouvée" }, { status: 404 });
    return NextResponse.json(preinscription, { status: 200 });
  } catch (error) {
    console.error("Erreur GET Preinscription par ID:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/preinscription/{id}:
 *   put:
 *     summary: Met à jour une préinscription
 *     tags:
 *       - Preinscription
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la préinscription à modifier
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
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telephone:
 *                 type: string
 *               etablissementDeProvenance:
 *                 type: string
 *               filiere:
 *                 type: string
 *               niveau:
 *                 type: string
 *               actdeNaissance:
 *                 type: string
 *                 format: binary
 *                 description: Fichier acte de naissance (optionnel)
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Fichier photo (optionnel)
 *               bulletin:
 *                 type: string
 *                 format: binary
 *                 description: Fichier bulletin (optionnel)
 *     responses:
 *       200:
 *         description: Préinscription mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preinscription'
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Préinscription non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Le contenu doit être multipart/form-data' }, { status: 400 });
    }

    const formData = await request.formData();

    const nom = formData.get('nom');
    const prenom = formData.get('prenom');
    const email = formData.get('email');
    const telephone = formData.get('telephone');
    const etablissementDeProvenance = formData.get('etablissementDeProvenance');
    const filiere = formData.get('filiere');
    const niveau = formData.get('niveau');

    const actdeNaissanceFile = formData.get('actdeNaissance');
    const photoFile = formData.get('photo');
    const bulletinFile = formData.get('bulletin');

    // Chercher la préinscription existante
    const preinscription = await prisma.preinscription.findUnique({ where: { id } });
    if (!preinscription) return NextResponse.json({ error: "Préinscription non trouvée" }, { status: 404 });

    // Fonction pour uploader un fichier et retourner l'URL publique
    async function uploadFile(file, prefix) {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `${prefix}/${fileName}`;

      const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) throw new Error(`Erreur upload ${prefix} : ${error.message}`);

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      if (!urlData?.publicUrl) throw new Error(`Impossible d'obtenir l'URL publique pour ${prefix}`);

      return urlData.publicUrl;
    }

    // Préparer les données à mettre à jour
    const updateData = {
      ...(nom ? { nom } : {}),
      ...(prenom ? { prenom } : {}),
      ...(email ? { email } : {}),
      ...(telephone ? { telephone } : {}),
      ...(etablissementDeProvenance ? { etablissementDeProvenance } : {}),
      ...(filiere ? { filiere } : {}),
      ...(niveau ? { niveau } : {}),
    };

    // Upload fichiers si présents, sinon garder l'ancien URL
    if (actdeNaissanceFile) {
      updateData.actdeNaissanceUrl = await uploadFile(actdeNaissanceFile, 'acte-de-naissance');
    }
    if (photoFile) {
      updateData.photoUrl = await uploadFile(photoFile, 'photos');
    }
    if (bulletinFile) {
      updateData.bulletinUrl = await uploadFile(bulletinFile, 'bulletins');
    }

    // Mise à jour en base
    const updated = await prisma.preinscription.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Erreur PUT Preinscription :", error);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/preinscription/{id}:
 *   delete:
 *     summary: Supprime une préinscription et ses fichiers
 *     tags:
 *       - Preinscription
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la préinscription à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Préinscription supprimée avec succès
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
 *         description: Préinscription non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const preinscription = await prisma.preinscription.findUnique({ where: { id } });
    if (!preinscription) return NextResponse.json({ error: "Préinscription non trouvée" }, { status: 404 });

    // Supprimer fichiers du storage Supabase
    async function removeFile(url) {
      try {
        const urlObj = new URL(url);
        // Extraction du chemin dans le bucket (après /storage/v1/object/public/)
        const filePath = urlObj.pathname.split('/storage/v1/object/public/')[1];
        if (filePath) {
          const { error } = await supabase.storage.from(bucket).remove([filePath]);
          if (error) console.error("Erreur suppression fichier :", error);
        }
      } catch (e) {
        console.warn("Impossible d'extraire chemin fichier à supprimer");
      }
    }

    await Promise.all([
      removeFile(preinscription.actdeNaissanceUrl),
      removeFile(preinscription.photoUrl),
      removeFile(preinscription.bulletinUrl),
    ]);

    // Supprimer la préinscription en base
    await prisma.preinscription.delete({ where: { id } });

    return NextResponse.json({ message: "Préinscription supprimée" }, { status: 200 });
  } catch (error) {
    console.error("Erreur DELETE Preinscription :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
