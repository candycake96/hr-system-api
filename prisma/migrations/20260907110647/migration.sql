/*
  Warnings:

  - A unique constraint covering the columns `[company_id,id]` on the table `branch` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "branch_code_key";

-- CreateTable
CREATE TABLE "user_company" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "all_branches" BOOLEAN NOT NULL DEFAULT true,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_branch_access" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_company_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_branch_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_company_user_id_is_active_idx" ON "user_company"("user_id", "is_active");

-- CreateIndex
CREATE INDEX "user_company_company_id_is_active_idx" ON "user_company"("company_id", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "user_company_user_id_company_id_key" ON "user_company"("user_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_company_id_company_id_key" ON "user_company"("id", "company_id");

-- CreateIndex
CREATE INDEX "user_branch_access_company_id_branch_id_idx" ON "user_branch_access"("company_id", "branch_id");

-- CreateIndex
CREATE INDEX "user_branch_access_user_company_id_idx" ON "user_branch_access"("user_company_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_branch_access_user_company_id_branch_id_key" ON "user_branch_access"("user_company_id", "branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "branch_company_id_id_key" ON "branch"("company_id", "id");

-- AddForeignKey
ALTER TABLE "user_company" ADD CONSTRAINT "user_company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_company" ADD CONSTRAINT "user_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_branch_access" ADD CONSTRAINT "user_branch_access_user_company_id_company_id_fkey" FOREIGN KEY ("user_company_id", "company_id") REFERENCES "user_company"("id", "company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_branch_access" ADD CONSTRAINT "user_branch_access_company_id_branch_id_fkey" FOREIGN KEY ("company_id", "branch_id") REFERENCES "branch"("company_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
