/*
  Warnings:

  - You are about to drop the column `lastSpeed` on the `VehicleStatus` table. All the data in the column will be lost.
  - Added the required column `lastOdometer` to the `VehicleStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."VehicleStatus" DROP COLUMN "lastSpeed",
ADD COLUMN     "lastOdometer" INTEGER NOT NULL;
