import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/calendrier:
 *   get:
 *     description: Récupérer les événements du calendrier
 *     responses:
 *       200:
 *         description: Événements du calendrier récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       evenement:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération des événements du calendrier"
 */
// GET - liste des événements
export async function GET() {
  try {
    const events = await prisma.calendrier.findMany();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Erreur calendrier:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/calendrier:
 *   post:
 *     description: Ajouter un événement au calendrier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evenement:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Événement ajouté avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "événement et date requis"
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { evenement, date } = body;

    if (!evenement || !date) {
      return NextResponse.json(
        { error: "événement et date requis" },
        { status: 400 }
      );
    }

    const newEvent = await prisma.calendrier.create({
      data: {
        evenement,
        date: new Date(date),
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Erreur ajout événement:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
