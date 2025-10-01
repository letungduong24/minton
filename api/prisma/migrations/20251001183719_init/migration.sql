-- CreateEnum
CREATE TYPE "public"."AuthProviderType" AS ENUM ('GOOGLE', 'CREDENTIALS');

-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "public"."User" (
    "uid" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "AuthProvider" "public"."AuthProviderType" NOT NULL,
    "role" "public"."Roles" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
