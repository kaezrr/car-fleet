/*
  Warnings:

  - You are about to drop the column `updated` on the `VehicleStatus` table. All the data in the column will be lost.
  - Added the required column `lastFuel` to the `VehicleStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastSpeed` to the `VehicleStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."VehicleStatus" DROP COLUMN "updated",
ADD COLUMN     "lastDriven" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastFuel" INTEGER NOT NULL,
ADD COLUMN     "lastSpeed" INTEGER NOT NULL;
