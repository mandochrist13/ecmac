import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

/**
 * @swagger
 * 
 * /api/actualites:
 * *   get:
 * *     summary: Récupérer la liste des actualités
 * *     description: Retourne une liste paginée des actualités
 * *     tags: [Actualités]
 * *     parameters:
 * *       - in: query
 * *         name: page
 * *         schema:
 * *           type: integer
 * *           default: 1
 * *         description: Page actuelle
 * *       - in: query
 * *         name: limit
 * *         schema:
 * *           type: integer
 * *           default: 10
 * *     responses:
 * *       200:
 * *         description: Liste récupérée avec succès
 * *       404:
 * *         description: Aucune actualité trouvée
 * *       500:
 * *         description: Erreur serveur
 */
///GET Recuperer tous actualites
export async function GET(request) {
  try {
    const actualites = await prisma.actualite.findMany();
    return NextResponse.json(actualites, { status: 200 });
  } catch (error) {
    console.error("Erreur actualites:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * * @swagger
 * * /api/actualites:
 * *   post:  
 * *     summary: Créer une actualité
 * *     description: Crée une nouvelle actualité avec un titre, un contenu et une image
 * *     tags: [Actualités]
 * *     requestBody:
 * *       required: true
 * *       content:
 * *         multipart/form-data:
 * *           schema:
 * *             type: object
 * *             required:
 * *               - titre
 * *               - contenu
 * *               - imageUrl
 * *             properties:
 * *               titre:
 * *                 type: string
 * *                 description: Titre de l'actualité
 * *               contenu: 
 * *                 type: string
 * *                 description: Contenu de l'actualité
 * *               imageUrl:
 * *                 type: string
 * *                 format: binary
 * *                 description: URL de l'image associée à l'actualité 
 * *     responses:
 * *       201:
 * *         description: Actualité créée avec succès
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 id:
 * *                   type: integer
 * *                 titre:
 * *                   type: string
 * *                 contenu:
 * *                   type: string
 * *                 imageUrl:
 * *                   type: string
 * *       400:
 * *         description: Requête invalide, des champs requis sont manquants
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 error:
 * *                   type: string
 * *                   description: Message d'erreur
 * *                   example: "Titre, contenu et imageUrl sont requis"
 * *       500:
 * *         description: Erreur lors de la création de l'actualité
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 error:
 * *                   type: string
 * *                   description: Message d'erreur
 * *                   example: "Erreur lors de la création de l'actualité"
 */


// Post - Créer une actualité


export async function POST(request) {
  try {
    // Vérifie le type de contenu
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    // Récupère les champs du formulaire
    const formData = await request.formData();
    const titre = formData.get('titre');
    const contenu = formData.get('contenu');
    const file = formData.get('imageUrl');

    // Validation basique
    if (!titre || !contenu) {
      return NextResponse.json(
        { error: 'Les champs titre et contenu sont requis' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Si un fichier est fourni, on l'upload vers Supabase
    if (file && file.name) {
      const filePath = `images/${Date.now()}_${file.name.replace(/\s+/g, '-')}`;

      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('actualite')
        .upload(filePath, file);

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      // Récupérer l'URL publique
      const { data: publicUrlData } = supabase
        .storage
        .from('actualites')
        .getPublicUrl(filePath);

      imageUrl = publicUrlData?.publicUrl || null;
    }

    // Création dans la base de données
    const actualite = await prisma.actualite.create({
      data: {
        titre,
        contenu,
        imageUrl,
        date: new Date(), // Assure que le champ "date" existe dans le modèle
      },
    });

    return NextResponse.json(actualite, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'actualité:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

