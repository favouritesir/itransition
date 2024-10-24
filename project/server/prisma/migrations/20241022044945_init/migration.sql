/*
  Warnings:

  - You are about to drop the column `apiKey` on the `Developers` table. All the data in the column will be lost.
  - You are about to drop the column `config` on the `Developers` table. All the data in the column will be lost.
  - You are about to drop the column `joinAt` on the `Developers` table. All the data in the column will be lost.
  - You are about to drop the column `renewAt` on the `Developers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Developers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Developers_apiKey_key";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "id" SET DEFAULT (extract(epoch from now()) * 1000)::bigint;

-- AlterTable
ALTER TABLE "Developers" DROP COLUMN "apiKey",
DROP COLUMN "config",
DROP COLUMN "joinAt",
DROP COLUMN "renewAt";

-- CreateTable
CREATE TABLE "API" (
    "id" INTEGER NOT NULL,
    "domain" VARCHAR(150) NOT NULL,
    "apiKey" CHAR(25) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "config" JSONB NOT NULL,

    CONSTRAINT "API_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "API_apiKey_key" ON "API"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Developers_email_key" ON "Developers"("email");

-- AddForeignKey
ALTER TABLE "API" ADD CONSTRAINT "API_id_fkey" FOREIGN KEY ("id") REFERENCES "Developers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
