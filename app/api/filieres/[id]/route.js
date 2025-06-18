import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

/

/**
 * @swagger
 * /api/filieres/{id}:
 *   get:
 *     description: Recuperer une filiere par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filieres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Filieres non trouvée
 */
// GET Recuperer une filiere par son ID
export async function GET(request) {
  try {
    const { id } = request.params;
    const filiere = await prisma.filiere.findUnique({
      where: { id },
    });
    if (!filiere) {
      return NextResponse.json(
        { error: "Filiere non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json(filiere, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de la filiere:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * /api/filieres/{id}:
 *   put:
 *     description: Mettre à jour une filiere par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       200:
 *         description: Filiere mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 */
// PUT Mettre à jour une filiere par son ID
export async function PUT(request) {
  try {
    const { id } = request.params;
    const { name, description } = await request.json();
    
    const updatedFiliere = await prisma.filiere.update({
      where: { id },
      data: { name, description },
    });
    
    return NextResponse.json(updatedFiliere, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la filiere:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * /api/filieres/{id}:
 *   delete:
 *     description: Supprimer une filiere par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filiere supprimée avec succès
 *       404:
 *         description: Filiere non trouvée
 */
// DELETE Supprimer une filiere par son ID
export async function DELETE(request) {
  try {
    const { id } = request.params;
    
    const deletedFiliere = await prisma.filiere.delete({
      where: { id },
    });
    
    return NextResponse.json(deletedFiliere, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de la filiere:", error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Filiere non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
