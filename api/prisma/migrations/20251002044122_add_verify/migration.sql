-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."VerifyCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerifyCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerifyCode_code_key" ON "public"."VerifyCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "VerifyCode_userId_key" ON "public"."VerifyCode"("userId");

-- AddForeignKey
ALTER TABLE "public"."VerifyCode" ADD CONSTRAINT "VerifyCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
