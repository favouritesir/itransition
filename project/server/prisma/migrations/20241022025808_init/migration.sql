-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'ORGS', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('FORM', 'QUIZ', 'POLL');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR(50),
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "proUser" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" BIGINT NOT NULL,
    "fullName" VARCHAR(30),
    "phone" VARCHAR(30)[],
    "address" JSONB,
    "birthdate" DATE,
    "gender" "Gender",
    "language" SMALLINT NOT NULL DEFAULT 0,
    "countryIndex" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "others" JSONB NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" BIGINT NOT NULL,
    "currentWorkspace" SMALLINT NOT NULL DEFAULT 0,
    "ltr" BOOLEAN NOT NULL DEFAULT true,
    "hour24" BOOLEAN NOT NULL DEFAULT true,
    "light" BOOLEAN NOT NULL DEFAULT true,
    "others" JSONB NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSpaces" (
    "index" SMALLINT NOT NULL,
    "owner" BIGINT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "code" BIGINT,
    "themeIndex" BIGINT NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "settings" JSONB NOT NULL,

    CONSTRAINT "WorkSpaces_pkey" PRIMARY KEY ("owner","index")
);

-- CreateTable
CREATE TABLE "Spaces" (
    "index" SMALLINT NOT NULL,
    "workSpace" SMALLINT NOT NULL,
    "owner" BIGINT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "settings" JSONB,

    CONSTRAINT "Spaces_pkey" PRIMARY KEY ("owner","index")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" BIGINT NOT NULL,
    "WorkspaceIndex" SMALLINT NOT NULL,
    "workSpaceOwner" BIGINT NOT NULL,
    "spaces" SMALLINT[],
    "editor" BOOLEAN[],
    "settings" JSONB NOT NULL,
    "joinAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("workSpaceOwner","id","WorkspaceIndex")
);

-- CreateTable
CREATE TABLE "Folders" (
    "id" BIGSERIAL NOT NULL,
    "space" SMALLINT NOT NULL,
    "creator" BIGINT,
    "owner" BIGINT NOT NULL,
    "parent" BIGINT,
    "title" VARCHAR(30) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "shares" JSONB NOT NULL,
    "settings" JSONB NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" BIGSERIAL NOT NULL,
    "index" SMALLINT,
    "spaceIndex" SMALLINT NOT NULL,
    "folder" BIGINT,
    "creator" BIGINT NOT NULL,
    "owner" BIGINT NOT NULL,
    "docType" "DocumentType" NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "liveResponse" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "trashed" BOOLEAN NOT NULL DEFAULT false,
    "pages" TEXT[],
    "shares" JSONB NOT NULL,
    "settings" JSONB NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocks" (
    "index" SMALLINT NOT NULL,
    "name" VARCHAR(30),
    "pageIndex" SMALLINT NOT NULL,
    "document" BIGINT NOT NULL,
    "widthRatio" SMALLINT NOT NULL,
    "titleFeild" JSONB NOT NULL,
    "responseFeild" JSONB NOT NULL,
    "settings" JSONB NOT NULL,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blocks_pkey" PRIMARY KEY ("document","pageIndex","index")
);

-- CreateTable
CREATE TABLE "Responses" (
    "index" SMALLINT NOT NULL,
    "pageIndex" SMALLINT NOT NULL,
    "document" BIGINT NOT NULL,
    "responseBy" BIGINT,
    "userIdentifire" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "responseStart" TIMESTAMPTZ NOT NULL,
    "responseEnd" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("userIdentifire","document","pageIndex","index")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
    "document" BIGINT NOT NULL,
    "owner" BIGINT,
    "recieveBy" TEXT,
    "replyFor" BIGINT,
    "userIdentifire" TEXT NOT NULL,
    "commentForTemplates" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("userIdentifire","document","id")
);

-- CreateTable
CREATE TABLE "Templates" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "catagories" SMALLINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contents" JSONB NOT NULL,
    "reviews" JSONB NOT NULL,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UiLanguages" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "code" CHAR(4) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "content" JSONB NOT NULL,

    CONSTRAINT "UiLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Themes" (
    "id" BIGSERIAL NOT NULL,
    "createdBy" BIGINT,
    "name" VARCHAR(30) NOT NULL,
    "forDarkMode" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "content" JSONB NOT NULL,
    "reviews" JSONB NOT NULL,

    CONSTRAINT "Themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "apiKey" CHAR(25) NOT NULL,
    "joinAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB NOT NULL,

    CONSTRAINT "Developers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Profiles_countryIndex_idx" ON "Profiles"("countryIndex");

-- CreateIndex
CREATE INDEX "Settings_currentWorkspace_idx" ON "Settings"("currentWorkspace");

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpaces_code_key" ON "WorkSpaces"("code");

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpaces_name_owner_key" ON "WorkSpaces"("name", "owner");

-- CreateIndex
CREATE UNIQUE INDEX "Spaces_name_workSpace_key" ON "Spaces"("name", "workSpace");

-- CreateIndex
CREATE INDEX "Members_workSpaceOwner_idx" ON "Members"("workSpaceOwner");

-- CreateIndex
CREATE INDEX "Folders_title_owner_idx" ON "Folders"("title", "owner");

-- CreateIndex
CREATE INDEX "Documents_folder_creator_owner_title_idx" ON "Documents"("folder", "creator", "owner", "title");

-- CreateIndex
CREATE INDEX "Templates_title_description_idx" ON "Templates"("title", "description");

-- CreateIndex
CREATE UNIQUE INDEX "UiLanguages_name_key" ON "UiLanguages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UiLanguages_code_key" ON "UiLanguages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Themes_name_key" ON "Themes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Developers_apiKey_key" ON "Developers"("apiKey");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_language_fkey" FOREIGN KEY ("language") REFERENCES "UiLanguages"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_id_fkey" FOREIGN KEY ("id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_currentWorkspace_id_fkey" FOREIGN KEY ("currentWorkspace", "id") REFERENCES "WorkSpaces"("index", "owner") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpaces" ADD CONSTRAINT "WorkSpaces_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpaces" ADD CONSTRAINT "WorkSpaces_themeIndex_fkey" FOREIGN KEY ("themeIndex") REFERENCES "Themes"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_workSpace_owner_fkey" FOREIGN KEY ("workSpace", "owner") REFERENCES "WorkSpaces"("index", "owner") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_id_fkey" FOREIGN KEY ("id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_workSpaceOwner_fkey" FOREIGN KEY ("workSpaceOwner") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_workSpaceOwner_WorkspaceIndex_fkey" FOREIGN KEY ("workSpaceOwner", "WorkspaceIndex") REFERENCES "WorkSpaces"("owner", "index") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_creator_fkey" FOREIGN KEY ("creator") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_space_owner_fkey" FOREIGN KEY ("space", "owner") REFERENCES "Spaces"("index", "owner") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_owner_spaceIndex_fkey" FOREIGN KEY ("owner", "spaceIndex") REFERENCES "Spaces"("owner", "index") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_creator_fkey" FOREIGN KEY ("creator") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_folder_fkey" FOREIGN KEY ("folder") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocks" ADD CONSTRAINT "Blocks_document_fkey" FOREIGN KEY ("document") REFERENCES "Documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_document_pageIndex_index_fkey" FOREIGN KEY ("document", "pageIndex", "index") REFERENCES "Blocks"("document", "pageIndex", "index") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_document_fkey" FOREIGN KEY ("document") REFERENCES "Documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_responseBy_fkey" FOREIGN KEY ("responseBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_replyFor_document_recieveBy_fkey" FOREIGN KEY ("replyFor", "document", "recieveBy") REFERENCES "Comments"("id", "document", "userIdentifire") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_document_fkey" FOREIGN KEY ("document") REFERENCES "Documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Themes" ADD CONSTRAINT "Themes_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
