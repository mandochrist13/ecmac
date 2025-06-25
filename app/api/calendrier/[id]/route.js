import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/calendrier/{id}:
 *   get:
 *     summary: Récupérer un événement par ID
 *     description: Retourne un événement du calendrier à partir de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement récupéré avec succès
 *       404:
 *         description: Événement non trouvé
 *       400:
 *         description: ID invalide
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const event = await prisma.calendrier.findUnique({ where: { id } });

    if (!event) {
      return NextResponse.json({ error: "Événement non trouvé" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/calendrier/{id}:
 *   put:
 *     summary: Mettre à jour un événement
 *     description: Met à jour les informations d'un événement du calendrier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - evenement
 *               - date
 *             properties:
 *               evenement:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Événement mis à jour avec succès
 *       400:
 *         description: Données ou ID invalides
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  const { evenement, date } = await request.json();

  if (!evenement || !date) {
    return NextResponse.json({ error: "événement et date requis" }, { status: 400 });
  }

  try {
    const updated = await prisma.calendrier.update({
      where: { id },
      data: {
        evenement,
        date: new Date(date),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/calendrier/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     description: Supprime un événement du calendrier en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement supprimé avec succès
 *       404:
 *         description: Événement non trouvé
 *       400:
 *         description: ID invalide
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    await prisma.calendrier.delete({ where: { id } });
    return NextResponse.json({ message: "Événement supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
