-- CreateEnum
CREATE TYPE "public"."TokenType" AS ENUM ('PASSWORD_RECOVER');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'MEMBER', 'BILLING');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tokens" (
    "id" TEXT NOT NULL,
    "type" "public"."TokenType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."members" (
    "id" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'MEMBER',
    "organization_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "should_attach_users_by_domain" BOOLEAN NOT NULL DEFAULT false,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "invites_email_idx" ON "public"."invites"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invites_email_organization_id_key" ON "public"."invites"("email", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "members_user_id_organization_id_key" ON "public"."members"("user_id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "public"."organizations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_domain_key" ON "public"."organizations"("domain");

-- AddForeignKey
ALTER TABLE "public"."tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invites" ADD CONSTRAINT "invites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invites" ADD CONSTRAINT "invites_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."members" ADD CONSTRAINT "members_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."members" ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organizations" ADD CONSTRAINT "organizations_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
