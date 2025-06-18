import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";








/**
 * @swagger
 * /api/actualites:
 *   get:
 *     description: Recuperer la liste des actualites
 *     responses:
 *       200:
 *         description: la liste des actualites recuperée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   image_url:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 * *       500:
 *         description: Erreur lors de la récupération 
 *  
 */

//GET Recuperer tous actualites
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
 * @swagger
 * /api/actualites:
 *   post:
 *     description: Crée une nouvelle actualité avec un titre, un contenu et une URL d'image.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: création d'une nouvelle actualité réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error
 * 
 */




// POST Créer une nouvelle actualité
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, imageUrl } = body;

    if (!title || !content ) {
      return NextResponse.json({ error: "Les champs titre, contenu  sont requis." }, { status: 400 });
    }

    const { data, error } = await prisma.actualite.create({
      data: {
        title,
        content,
        image_url: imageUrl,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 201 }, { message: "Actualité créée avec succès" });
  } catch (error) {
    console.error("Error de creation:", error);
    return NextResponse.json({ error: "Erreur Serveur" }, { status: 500 });
  }
}





