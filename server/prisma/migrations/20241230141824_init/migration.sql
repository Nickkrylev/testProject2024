/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `name` VARCHAR(50) NOT NULL DEFAULT 'Anonymus';

-- CreateIndex
CREATE UNIQUE INDEX `phone_number` ON `users`(`phone_number`);
