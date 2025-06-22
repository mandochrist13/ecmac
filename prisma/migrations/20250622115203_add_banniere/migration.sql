/*
  Warnings:

  - Added the required column `actdeNaissanceUrl` to the `Preinscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulletinUrl` to the `Preinscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etablissementDeProvenance` to the `Preinscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `Preinscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preinscription" ADD COLUMN     "actdeNaissanceUrl" TEXT NOT NULL,
ADD COLUMN     "bulletinUrl" TEXT NOT NULL,
ADD COLUMN     "etablissementDeProvenance" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Banniere" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "sousTitre" TEXT,
    "imageUrl" TEXT NOT NULL,
    "lien" TEXT,
    "ordre" INTEGER NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banniere_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Preinscription_email_idx" ON "Preinscription"("email");

-- CreateIndex
CREATE INDEX "Preinscription_createdAt_idx" ON "Preinscription"("createdAt");
