-- DropForeignKey
ALTER TABLE "public"."Telemetry" DROP CONSTRAINT "Telemetry_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Telemetry" ADD CONSTRAINT "Telemetry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
