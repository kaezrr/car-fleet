-- DropForeignKey
ALTER TABLE "public"."VehicleStatus" DROP CONSTRAINT "VehicleStatus_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "public"."VehicleStatus" ADD CONSTRAINT "VehicleStatus_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
