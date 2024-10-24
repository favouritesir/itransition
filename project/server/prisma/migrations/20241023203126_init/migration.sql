-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "id" SET DEFAULT (extract(epoch from now()) * 1000)::bigint;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
