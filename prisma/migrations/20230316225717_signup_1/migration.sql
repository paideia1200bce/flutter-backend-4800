/*
  Warnings:

  - A unique constraint covering the columns `[phone_no]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "civil_status" TEXT,
ADD COLUMN     "dob" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "phone_no" TEXT,
ADD COLUMN     "residence" JSONB;

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_no_key" ON "User"("phone_no");
