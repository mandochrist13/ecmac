
import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";



/**
 * @swagger
 * api/calendrier/%5Bid%5D
 * get:
 *   description: Récupérer un événement spécifique du calendrier
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Événement récupéré avec succès
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   start:
 *                     type: string
 *                     format: date-time
 *                   end:
 *                     type: string
 *                     format: date-time
 */

// Récupération d'un événement spécifique du calendrier
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "ID d'événement requis" },
                { status: 400 }
            );
        }

        const event = await prisma.event.findUnique({
            where: { id },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Événement non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json({ event }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'événement:", error);
        return NextResponse.json(
            { error: error.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}
/**
 * @swagger
 * api/calendrier/%5Bid%5D
 * delete:
 *   description: Supprimer un événement spécifique du calendrier
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *     204:
 *       description: Événement supprimé avec succès
 *     400:
 *       description: ID d'événement requis
 *     404:
 *       description: Événement non trouvé
 */

// Suppression d'un événement spécifique du calendrier
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "ID d'événement requis" },
                { status: 400 }
            );
        }

        const event = await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'événement:", error);
        return NextResponse.json(
            { error: error.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}
/**
 * @swagger
 * api/calendrier/%5Bid%5D
 * put:
 *   description: Mettre à jour un événement spécifique du calendrier
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             start:
 *               type: string
 *               format: date-time
 *             end:
 *               type: string
 *               format: date-time
 *   responses:
 *     200:
 *       description: Événement mis à jour avec succès
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   start:
 *                     type: string
 *                     format: date-time
 *                   end:
 *                     type: string
 *                     format: date-time
 */

// Mise à jour d'un événement spécifique du calendrier
export async function PUT(request) {
    try {
        const { id, title, start, end } = await request.json();

        // Validation des données
        if (!id || !title || !start || !end) {
            return NextResponse.json(
                { error: "ID, titre, date de début et date de fin sont requis." },
                { status: 400 }
            );
        }

        // Mise à jour de l'événement dans la base de données
        const event = await prisma.event.update({
            where: { id },
            data: {
                title,
                start: new Date(start),
                end: new Date(end),
            },
        });

        return NextResponse.json({ event }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'événement:", error);
        return NextResponse.json(
            { error: error.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}

