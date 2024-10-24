/*
  Warnings:

  - The primary key for the `API` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isCurrent` on the `Documents` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Profiles` table. All the data in the column will be lost.
  - You are about to drop the column `currentWorkspace` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `settingsId` to the `Documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_language_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_currentWorkspace_id_fkey";

-- DropIndex
DROP INDEX "Settings_currentWorkspace_idx";

-- AlterTable
ALTER TABLE "API" DROP CONSTRAINT "API_pkey",
ALTER COLUMN "apiKey" SET DATA TYPE CHAR(64),
ADD CONSTRAINT "API_pkey" PRIMARY KEY ("id", "domain");

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "id" SET DEFAULT (extract(epoch from now()) * 1000)::bigint;

-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "isCurrent",
ADD COLUMN     "settingsId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "birthdate",
DROP COLUMN "language",
ADD COLUMN     "birthDate" DATE,
ADD COLUMN     "languageIndex" SMALLINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "currentWorkspace",
ADD COLUMN     "currentDoc" BIGINT,
ALTER COLUMN "others" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Settings_currentDoc_idx" ON "Settings"("currentDoc");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_languageIndex_fkey" FOREIGN KEY ("languageIndex") REFERENCES "UiLanguages"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_currentDoc_fkey" FOREIGN KEY ("currentDoc") REFERENCES "Documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
