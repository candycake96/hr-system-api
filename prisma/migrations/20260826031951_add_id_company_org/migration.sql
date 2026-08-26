/*
  Warnings:

  - Added the required column `company_id` to the `department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `side` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "department" ADD COLUMN     "company_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "position" ADD COLUMN     "company_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "side" ADD COLUMN     "company_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "side" ADD CONSTRAINT "side_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
