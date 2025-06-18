import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";


/**
 * @swagger
 * /api/galerie:
 *   get:
 *     description: Recuperer toutes les images de la galerie
 *     responses:
 *       200:
 *         description: Images récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   url:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                  updated_at:
 *                    type: string
 *                   format: date-time
 * *       500:
 *        description: Erreur serveur   
 * 
 */

// GET Recuperer toutes les images de la galerie
export async function GET(request) {
  try {
    const images = await prisma.galerie.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des images de la galerie:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/galerie:
 *   post:
 *     description: Ajouter une image à la galerie
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 url:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Erreur serveur
 */
// POST Ajouter une image à la galerie
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Fichier non fourni ou invalide" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.storage
      .from("galerie")
      .upload(`images/${Date.now()}_${file.name}`, file);

    if (error) {
      throw new Error(error.message);
    }

    const imageUrl = supabase.storage.from("galerie").getPublicUrl(data.path).publicURL;

    const newImage = await prisma.galerie.create({
      data: {
        url: imageUrl,
      },
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image à la galerie:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}