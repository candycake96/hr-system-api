/*
  Warnings:

  - A unique constraint covering the columns `[company_id,code]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id,employee_code]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id,code]` on the table `position` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id,code]` on the table `side` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "department_code_key";

-- DropIndex
DROP INDEX "employee_employee_code_key";

-- DropIndex
DROP INDEX "position_code_key";

-- DropIndex
DROP INDEX "side_code_key";

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employee_id" UUID NOT NULL,
    "address_1" VARCHAR(255) NOT NULL,
    "address_2" VARCHAR(255),
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "department_company_id_code_key" ON "department"("company_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_company_id_employee_code_key" ON "employee"("company_id", "employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "position_company_id_code_key" ON "position"("company_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "side_company_id_code_key" ON "side"("company_id", "code");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
