/*
  Warnings:

  - You are about to drop the column `email` on the `NewsletterSubscriber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `NewsletterSubscriber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `NewsletterSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NewsletterSubscriber_email_key";

-- AlterTable
ALTER TABLE "NewsletterSubscriber" DROP COLUMN "email",
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_phone_key" ON "NewsletterSubscriber"("phone");
