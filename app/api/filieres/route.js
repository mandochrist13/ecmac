import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/filieres:
 *   get:
 *     description: Recuperer la liste des filieres
 *     responses:
 *       200:
 *         description: la liste des filieres recuperée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur lors de la récupération 
 */
// GET Recuperer tous les filieres
export async function GET(request) {
  try {
    const filieres = await prisma.filiere.findMany();
    return NextResponse.json(filieres, { status: 200 });
  } catch (error) {
    console.error("Erreur filieres:", error);
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filieres créée avec succès
 *       500:
 *         description: Erreur lors de la création de la filiere
 */
// POST Ajouter une nouvelle filiere
export async function POST(request) {
  try {
    const { name, description } = await request.json();
    const newFiliere = await prisma.filiere.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(newFiliere, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la filiere:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
