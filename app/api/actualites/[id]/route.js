import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const bucket = "actualite";

/* * @swagger
 * /api/actualites/{id}:
 *   get:
 *     summary: Récupérer une actualité par ID          
 * *     tags: [Actualités]
 * *     parameters:
 * *       - in: path
 * *         name: id
 * *         required: true
 * *         schema:
 * *           type: integer
 * *         description: ID de l'actualité à récupérer
 * *     responses:
 * *       200:
 * *         description: Actualité trouvée
 * *       404:
 * *         description: Actualité non trouvée
 * *       500:
 * *         description: Erreur serveur
 * *
*/
// GET - Récupérer une actualité par ID
export async function GET(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }
  try {
    const actualite = await prisma.actualite.findUnique({
      where: { id },
    });
    if (!actualite) {
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 });
    }
    return NextResponse.json(actualite, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'actualité :", error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération de l’actualité' },
      { status: 500 }
    );
  }
} 

/** * @swagger
 * /api/actualites/{id}:
 *   put:
 *     summary: Mettre à jour une actualité par ID
 *     tags: [Actualités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'actualité à mettre à jour
 *     requestBody: 
 * *       required: true
 * *       content:
 * *         application/json:
 * *           schema:
 * *             type: object
 * *             required:
 * *               - titre
 * *               - contenu
 * *               - date
 * *               - image
 * *             properties:
 * *               titre:
 * *                 type: string
 * *               contenu:
 * *                 type: string
 * *               date:
 * *                 type: string
 * *                 format: date-time
 * *               image:
 * *                 type: string
 * *                 description: URL de l'image associée à l'actualité
 * *     responses:
 * *       200:
 * *         description: Actualité mise à jour avec succès
 * *       400:
 * *         description: Requête invalide
 * *       404:
 * *         description: Actualité non trouvée
 * *       500:
 * *         description: Erreur lors de la mise à jour de l'actualité
 */

// PUT - Mettre à jour une actualité

export async function PUT(request, { params }) {
  const id = parseInt(params.id); 
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { titre, contenu, date, image } = body;

    if (!titre || !contenu || !date) {
      return NextResponse.json({ error: 'Titre, contenu et date sont requis' }, { status: 400 });
    }

    const actualite = await prisma.actualite.findUnique({
      where: { id },
    });

    if (!actualite) {
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 });
    }

    let imageUrl = actualite.imageUrl;

    if (image) {
      // Si une nouvelle image est fournie, on la télécharge
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(`actualites/${Date.now()}_${image.name}`, image);

      if (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
        return NextResponse.json({ error: 'Erreur lors du téléchargement de l’image' }, { status: 500 });
      }
      imageUrl = data.Key; // Mettre à jour l'URL de l'image
    }

    const updatedActualite = await prisma.actualite.update({
      where: { id },
      data: {
        titre,
        contenu,
        date,
        imageUrl,
      },
    });

    return NextResponse.json(updatedActualite, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'actualité :", error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la mise à jour de l’actualité' },
      { status: 500 }
    );
  }
}


/** * @swagger
 * /api/actualites/{id}:
 *   delete:
 *     summary: Supprimer une actualité par ID          
 * *     tags: [Actualités]
 * *     parameters:
 * *       - in: path
 * *         name: id
 * *         required: true
 * *         schema:
 * *           type: integer
 * *         description: ID de l'actualité à supprimer
 * *     responses:
 * *       200:
 * *         description: Actualité supprimée avec succès
 * *       400:
 * *         description: ID invalide ou actualité non trouvée
 * *       404:
 * *         description: Actualité non trouvée
 * *       500:
 * *         description: Erreur serveur lors de la suppression
 */

// DELETE - Supprimer une actualité par ID

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }
  try {
    const actualite = await prisma.actualite.findUnique({
      where: { id },
    });

    if (!actualite) {
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 });
    }

    // Supprimer l'image de Supabase si elle existe
    if (actualite.imageUrl) {
      const { error } = await supabase.storage.from(bucket).remove([actualite.imageUrl]);
      if (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
        return NextResponse.json({ error: 'Erreur lors de la suppression de l’image' }, { status: 500 });
      }
    }

    await prisma.actualite.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Actualité supprimée avec succès' }, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la suppression de l'actualité :", error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression de l’actualité' },
      { status: 500 }
    );
  }
} 
