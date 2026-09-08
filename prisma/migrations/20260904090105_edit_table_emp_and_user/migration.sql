/*
  Warnings:

  - You are about to drop the column `employeeGroupId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitleId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_employeeGroupId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_jobTitleId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_user_id_fkey";

-- DropIndex
DROP INDEX "employee_email_key";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "employeeGroupId",
DROP COLUMN "jobTitleId",
ADD COLUMN     "employee_group_id" UUID,
ADD COLUMN     "job_title_id" UUID;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "user_account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "email" VARCHAR(150),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_channel_type" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name_th" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150),
    "description" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_channel_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_channel" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "sales_channel_type_id" UUID NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name_th" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150),
    "description" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_territory" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "parent_territory_id" UUID,
    "code" VARCHAR(30) NOT NULL,
    "name_th" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150),
    "level_code" VARCHAR(30),
    "hierarchy_level" INTEGER NOT NULL DEFAULT 1,
    "description" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_territory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_account_username_key" ON "user_account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_email_key" ON "user_account"("email");

-- CreateIndex
CREATE INDEX "sales_channel_type_company_id_is_active_idx" ON "sales_channel_type"("company_id", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "sales_channel_type_company_id_code_key" ON "sales_channel_type"("company_id", "code");

-- CreateIndex
CREATE INDEX "sales_channel_company_id_sales_channel_type_id_idx" ON "sales_channel"("company_id", "sales_channel_type_id");

-- CreateIndex
CREATE INDEX "sales_channel_company_id_is_active_idx" ON "sales_channel"("company_id", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "sales_channel_company_id_code_key" ON "sales_channel"("company_id", "code");

-- CreateIndex
CREATE INDEX "sales_territory_company_id_parent_territory_id_idx" ON "sales_territory"("company_id", "parent_territory_id");

-- CreateIndex
CREATE INDEX "sales_territory_company_id_hierarchy_level_idx" ON "sales_territory"("company_id", "hierarchy_level");

-- CreateIndex
CREATE UNIQUE INDEX "sales_territory_company_id_code_key" ON "sales_territory"("company_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_user_id_key" ON "employee"("user_id");

-- CreateIndex
CREATE INDEX "employee_company_id_idx" ON "employee"("company_id");

-- CreateIndex
CREATE INDEX "employee_branch_id_idx" ON "employee"("branch_id");

-- CreateIndex
CREATE INDEX "employee_department_id_idx" ON "employee"("department_id");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_employee_group_id_fkey" FOREIGN KEY ("employee_group_id") REFERENCES "employee_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_job_title_id_fkey" FOREIGN KEY ("job_title_id") REFERENCES "job_title"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_channel_type" ADD CONSTRAINT "sales_channel_type_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_channel" ADD CONSTRAINT "sales_channel_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_channel" ADD CONSTRAINT "sales_channel_sales_channel_type_id_fkey" FOREIGN KEY ("sales_channel_type_id") REFERENCES "sales_channel_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_territory" ADD CONSTRAINT "sales_territory_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_territory" ADD CONSTRAINT "sales_territory_parent_territory_id_fkey" FOREIGN KEY ("parent_territory_id") REFERENCES "sales_territory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
