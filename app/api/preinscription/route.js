import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

const bucket = 'prinscription';

/**
 * @openapi
 * /api/preinscription:
 *   get:
 *     summary: Récupère la liste paginée des préinscriptions
 *     tags:
 *       - Preinscription
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page (1-based)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste paginée des préinscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Preinscription'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Erreur serveur
 *
 *   post:
 *     summary: Crée une nouvelle préinscription avec fichiers uploadés
 *     tags:
 *       - Preinscription
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - telephone
 *               - etablissementDeProvenance
 *               - filiere
 *               - niveau
 *               - actdeNaissance
 *               - photo
 *               - bulletin
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
 *                 description: Fichier acte de naissance
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Fichier photo
 *               bulletin:
 *                 type: string
 *                 format: binary
 *                 description: Fichier bulletin
 *     responses:
 *       201:
 *         description: Préinscription créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preinscription'
 *       400:
 *         description: Requête invalide (champs ou fichiers manquants)
 *       500:
 *         description: Erreur serveur
 */

// GET paginé
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('page');
    const limitParam = url.searchParams.get('limit');

    // Parse des paramètres page et limit avec valeurs par défaut
    const page = pageParam ? Math.max(parseInt(pageParam), 1) : 1;
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam), 1), 100) : 10;

    // Calcul offset pour pagination
    const skip = (page - 1) * limit;

    // Nombre total de préinscriptions
    const total = await prisma.preinscription.count();

    // Récupération paginée triée par date décroissante
    const data = await prisma.preinscription.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({ data, page, limit, total, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Erreur GET Preinscription :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * @swagger
 * paths:
  /api/preinscription:
    post:
      summary: Créer une préinscription avec envoi de fichiers
      description: Cette route permet de créer une préinscription en envoyant des fichiers et des champs texte via multipart/form-data.
      tags:
        - Preinscription
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              required:
                - nom
                - prenom
                - email
                - telephone
                - etablissementDeProvenance
                - filiere
                - niveau
                - actdeNaissance
                - photo
                - bulletin
              properties:
                nom:
                  type: string
                  example: Jean
                prenom:
                  type: string
                  example: Dupont
                email:
                  type: string
                  format: email
                  example: jean@example.com
                telephone:
                  type: string
                  example: "+24100000000"
                etablissementDeProvenance:
                  type: string
                  example: Lycée National
                filiere:
                  type: string
                  example: Informatique
                niveau:
                  type: string
                  example: Terminale
                actdeNaissance:
                  type: string
                  format: binary
                photo:
                  type: string
                  format: binary
                bulletin:
                  type: string
                  format: binary
      responses:
        '201':
          description: Préinscription créée avec succès
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  nom:
                    type: string
                  prenom:
                    type: string
                  email:
                    type: string
                  telephone:
                    type: string
                  etablissementDeProvenance:
                    type: string
                  filiere:
                    type: string
                  niveau:
                    type: string
                  actdeNaissanceUrl:
                    type: string
                  photoUrl:
                    type: string
                  bulletinUrl:
                    type: string
        '400':
          description: Requête invalide (champs manquants ou format incorrect)
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
        '500':
          description: Erreur serveur lors du traitement de la demande
 * 
 */

/// POST création avec upload fichiers
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    // Récupération des fichiers uploadés avec bons noms
    const actdeNaissanceFile = formData.get('actdeNaissance');
    const photoFile = formData.get('photo');
    const bulletinFile = formData.get('bulletin');

    // Récupération des champs texte
    const nom = formData.get('nom');
    const prenom = formData.get('prenom');
    const email = formData.get('email');
    const telephone = formData.get('telephone');
    const etablissementDeProvenance = formData.get('etablissementDeProvenance');
    const filiere = formData.get('filiere');
    const niveau = formData.get('niveau');

    console.log({
      nom, prenom, email, telephone, etablissementDeProvenance, filiere, niveau
    });

    // Validation des champs
    if (!nom || !prenom || !email || !telephone || !etablissementDeProvenance || !filiere || !niveau) {
      return NextResponse.json({ error: "Tous les champs texte sont requis" }, { status: 400 });
    }

    if (!actdeNaissanceFile || !photoFile || !bulletinFile) {
      return NextResponse.json({ error: "Tous les fichiers sont requis" }, { status: 400 });
    }

    // Fonction d’upload vers Supabase
const uploadFile = async (file, prefix) => {
  const timestamp = Date.now();

  // Nettoyage du nom de fichier : enlève les accents, les espaces, etc.
  const safeName = file.name
    .normalize("NFD")                   // décompose les accents
    .replace(/[\u0300-\u036f]/g, "")   // supprime les diacritiques
    .replace(/\s+/g, "-")              // remplace les espaces par des tirets
    .replace(/[^a-zA-Z0-9.\-_]/g, ""); // supprime les caractères spéciaux

  const fileName = `${timestamp}-${safeName}`;
  const filePath = `${prefix}/${fileName}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw new Error(`Erreur upload ${prefix} : ${error.message}`);

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  if (!urlData?.publicUrl) throw new Error(`Impossible d'obtenir l'URL publique pour ${prefix}`);

  return urlData.publicUrl;
  };

    //  Upload des fichiers
    const actdeNaissanceUrl = await uploadFile(actdeNaissanceFile, 'acteDeNaissance');
    const photoUrl = await uploadFile(photoFile, 'photos');
    const bulletinUrl = await uploadFile(bulletinFile, 'bulletins');

    // Création en base
    const newPreinscription = await prisma.preinscription.create({
      data: {
        nom,
        prenom,
        email,
        telephone,
        etablissementDeProvenance,
        filiere,
        niveau,
        actdeNaissanceUrl,
        photoUrl,
        bulletinUrl,
      },
    });

    return NextResponse.json(newPreinscription, { status: 201 });

  } catch (error) {
    console.error("Erreur POST Preinscription :", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur" }, { status: 500 });
  }
}
