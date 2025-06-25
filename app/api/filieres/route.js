import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/filieres:
 *   get:
 *     description: Récupérer la liste des filières
 *     responses:
 *       200:
 *         description: La liste des filières récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object 
 * *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   niveau:
 *                     type: string
 *       500:
 *        description: Erreur lors de la récupération des filières
 */

//GET all Filieres

export async function GET() {
  try {
    const filieres = await prisma.filiere.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(filieres, { status: 200 });
  } catch (error) {
    console.error("Erreur récupération filières:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}





/**
 * @swagger
 * /api/filieres:
 *   post:
 *     description: Ajouter une nouvelle filiere
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - niveau
 *             properties:
 *               nom:
 *                 type: string
 *               niveau:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filiere créée avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur lors de la création de la filiere
 */

export async function POST(request) {
  try {
    const { nom, niveau } = await request.json();

    if (!nom || !niveau) {
      return NextResponse.json(
        { error: "Champs 'nom' et 'niveau' sont obligatoires" },
        { status: 400 }
      );
    }

    const newFiliere = await prisma.filiere.create({
      data: {
        nom,
        niveau,
      },
    });

    return NextResponse.json(newFiliere, { status: 201 });
  } catch (error) {
    console.error("Erreur création filiere:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}
