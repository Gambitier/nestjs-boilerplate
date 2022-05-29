/*
  Warnings:

  - Made the column `userId` on table `Otp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
