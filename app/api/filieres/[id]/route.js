import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
 *           type: integer
 *         description: ID de la filiere
 *     responses:
 *       200:
 *         description: Filiere récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 niveau:
 *                   type: string
 *       404:
 *         description: Filiere non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function GET(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const filiere = await prisma.filiere.findUnique({ where: { id } });
    if (!filiere) {
      return NextResponse.json({ error: "Filiere non trouvée" }, { status: 404 });
    }
    return NextResponse.json(filiere, { status: 200 });
  } catch (error) {
    console.error("Erreur filiere GET par id:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/filieres/{id}:
 *   put:
 *     description: Mettre à jour une filiere existante par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la filiere à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               niveau:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filiere mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Filiere non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const { nom, niveau } = await request.json();

    if (nom === undefined && niveau === undefined) {
      return NextResponse.json({ error: "Aucune donnée fournie pour mise à jour" }, { status: 400 });
    }

    const filiereExist = await prisma.filiere.findUnique({ where: { id } });
    if (!filiereExist) {
      return NextResponse.json({ error: "Filiere non trouvée" }, { status: 404 });
    }

    const updatedFiliere = await prisma.filiere.update({
      where: { id },
      data: {
        ...(nom !== undefined && { nom }),
        ...(niveau !== undefined && { niveau }),
      },
    });

    return NextResponse.json(updatedFiliere, { status: 200 });
  } catch (error) {
    console.error("Erreur filiere PUT:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
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
 *           type: integer
 *         description: ID de la filiere à supprimer
 *     responses:
 *       204:
 *         description: Filiere supprimée avec succès
 *       404:
 *         description: Filiere non trouvée
 *       500:
 *         description: Erreur serveur
 */
export async function DELETE(request, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const filiereExist = await prisma.filiere.findUnique({ where: { id } });
    if (!filiereExist) {
      return NextResponse.json({ error: "Filiere non trouvée" }, { status: 404 });
    }

    await prisma.filiere.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur filiere DELETE:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}
