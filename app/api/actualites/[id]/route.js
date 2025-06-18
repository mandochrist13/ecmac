import { PrismaClient } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { Param } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * api/actualier
 * get:
 *   description: Récupérer les détails d'un actualier spécifique
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: L'ID de l'actualier à récupérer
 *       schema:
 *         type: string
 * *   responses:
 *     200:
 *       description: Détails de l'actualier récupérés avec succès
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_actualier:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image_url:
 *                 type: string
 *               created_at:
 *                 type: string
 *                 format: date-time
 *    400:
 *       description: ID de l'actualier requis ou invalide
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: Message d'erreur
 *                 example: "ID de l'actualier requis"
 *               example: "ID de l'actualier invalide"      
 *    404:
 *       description: Actualier non trouvé
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: Message d'erreur
 *                 example: "Actualier non trouvé"  
 * 
 *     500:
 *       description: Erreur lors de la récupération de l'actualier
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: Message d'erreur
 *                 example: "Erreur serveur"
 * 
 */

// GET Récupérer les détails d'un actualier spécifique

export async function GET(request, { params }) {
    const { id } = params.id ? params.id : request.nextUrl.searchParams.get('id');
    // Vérification de la présence de l'ID
    if (!id) {
        return NextResponse.json(
            { error: "ID de l'actualier requis" },
            { status: 400 }
        );
    }
    // Vérification de l'ID
    if (typeof id !== 'string' || id.trim() === '') {
        return NextResponse.json(
            { error: "ID de l'actualier invalide" },
            { status: 400 }
        );
    }
    // Récupération de l'actualier par ID
    try {
        const actualier = await prisma.actualier.findUnique({
            where: { id_actualier: id },
            include: {
                actualier: {
                    select: {
                        id_actualier: true,
                        title: true,
                        content: true,
                        image_url: true,
                        created_at: true
                    }
                }
            }
        })

    } catch (error) {
        console.error("Erreur actualier:", error);
        return NextResponse.json(
            { error: error.message || "Erreur serveur" },
            { status: 500 }
        );

    }
    if (!actualier) {
        return NextResponse.json(
            { error: "Actualier non trouvé" },
            { status: 404 }
        );
    }
    return NextResponse.json(actualier, { status: 200 });

}

/**
 * @swagger
 * /api/actualites/{id}:
 *   delete:
 *     description: Supprimer un actualier spécifique par son ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID de l'actualier à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actualier supprimé avec succès
 *       400:
 *         description: ID de l'actualier requis ou invalide
 *       404:
 *         description: Actualier non trouvé
 *       500:
 *         description: Erreur lors de la suppression de l'actualier
 */
// DELETE Supprimer un actualier spécifique par son ID
export async function DELETE(request, { params }) {
    const { id } = params.id ? params.id : request.nextUrl.searchParams.get('id');
    // Vérification de la présence de l'ID
    if (!id) {
        return NextResponse.json(
            { error: "ID de l'actualier requis" },
            { status: 400 }
        );
    }
    // Vérification de l'ID
    if (typeof id !== 'string' || id.trim() === '') {
        return NextResponse.json(
            { error: "ID de l'actualier invalide" },
            { status: 400 }
        );
    }
    // Suppression de l'actualier par ID
    try {
        const deletedActualier = await prisma.actualier.delete({
            where: { id_actualier: id }
        });
        return NextResponse.json(deletedActualier, { status: 200 });
    } catch (error) {
        console.error("Erreur actualier:", error);
        return NextResponse.json(
            { error: error.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}
/**
 * @swagger
 * /api/actualites/{id}:
 *   put:
 *     description: Mettre à jour un actualier spécifique par son ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID de l'actualier à mettre à jour
 *         schema:
 *           type: string
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
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualier mis à jour avec succès
 *       400:
 *         description: ID de l'actualier requis ou invalide
 *       404:
 *         description: Actualier non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour de l'actualier
 */

 // PUT Mettre à jour un actualier spécifique par son ID
export async function PUT(request, { params }) {
    const { id } = params.id ? params.id : request.nextUrl.searchParams.get('id');
    // Vérification de la présence de l'ID
    if (!id) {
        return NextResponse.json(
            { error: "ID de l'actualier requis" },
            { status: 400 }
        );
    }
    // Vérification de l'ID
    if (typeof id !== 'string' || id.trim() === '') {
        return NextResponse.json(
            { error: "ID de l'actualier invalide" },
            { status: 400 }
        );
    }
    // Récupération des données du corps de la requête
    const data = await request.json();
    // Mise à jour de l'actualier par ID
    try {
        const updatedActualier = await prisma.actualier.update({
            where: { id_actualier: id },
            data: {
                title: data.title,
                content: data.content,
                image_url: data.image_url
            }
        });
        return NextResponse.json(updatedActualier, { status: 200 });
    } catch (error) {
        console.error("Erreur actualier:", error);
        return NextResponse.json(
            { error: error.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}
