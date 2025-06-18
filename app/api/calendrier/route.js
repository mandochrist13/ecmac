
import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * api/calendrier
 * get:
 *   description: Récupérer les événements du calendrier
 *   responses:
 *     200:
 *       description: Événements du calendrier récupérés avec succès
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               events:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     start:
 *                       type: string
 *                       format: date-time
 * 
 * *     500:
 * *       description: Erreur interne du serveur
 *      content:
 * *         application/json:
 * *           schema:
 * *             type: object
 * *             properties:
 * *               error:
 * *                 type: string
 * *                 description: Message d'erreur
 * *                 example: "Erreur lors de la récupération des événements du calendrier"
 *  *
 */


// Importation de PrismaClient pour interagir avec la base de données
export async function GET(request){
    try {
        const events = await prisma.event.findMany();
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
 * api/calendrier
 * post:
 *   description: Ajouter un événement au calendrier
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             start:
 *               type: string
 *               format: date-time
 *   responses:
 *     201:
 *       description: Événement ajouté avec succès
 *     400:
 *       description: Requête invalide
 * *     500:
 *      description: Erreur interne du serveur
 * *     content:
 * *       application/json:
 * *         schema:
 * *           type: object
 * *           properties:
 * *             error:
 * *               type: string
 * *               description: Message d'erreur
 * *               example: "Titre et date de début requis"
 * 
 */
export async function POST(request) {
    try {
        const { title, start } = await request.json();
        
        if (!title || !start) {
            return NextResponse.json(
                { error: "Titre et date de début requis" },
                { status: 400 }
            );
        }

        const newEvent = await prisma.event.create({
            data: {
                title,
                start: new Date(start),
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