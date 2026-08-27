/*
  Warnings:

  - You are about to drop the column `branch_id` on the `department` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "department" DROP CONSTRAINT "department_branch_id_fkey";

-- AlterTable
ALTER TABLE "department" DROP COLUMN "branch_id";

-- CreateTable
CREATE TABLE "document_format" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company_id" UUID NOT NULL,
    "module_code" VARCHAR(30) NOT NULL,
    "document_type_code" VARCHAR(30) NOT NULL,
    "prefix" VARCHAR(20),
    "seq_length" INTEGER NOT NULL DEFAULT 4,
    "running_cycle" VARCHAR(20) NOT NULL,
    "pattern" VARCHAR(100) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRunning" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company_id" UUID NOT NULL,
    "module_code" VARCHAR(30) NOT NULL,
    "document_type_code" VARCHAR(30) NOT NULL,
    "year" INTEGER,
    "month" INTEGER,
    "last_running_no" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRunning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "document_format_company_id_idx" ON "document_format"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "document_format_company_id_module_code_document_type_code_key" ON "document_format"("company_id", "module_code", "document_type_code");

-- AddForeignKey
ALTER TABLE "document_format" ADD CONSTRAINT "document_format_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRunning" ADD CONSTRAINT "DocumentRunning_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRunning" ADD CONSTRAINT "DocumentRunning_company_id_module_code_document_type_code_fkey" FOREIGN KEY ("company_id", "module_code", "document_type_code") REFERENCES "document_format"("company_id", "module_code", "document_type_code") ON DELETE RESTRICT ON UPDATE CASCADE;
