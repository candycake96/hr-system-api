-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "employeeGroupId" UUID;

-- CreateTable
CREATE TABLE "employee_group" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company_id" UUID NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name_th" VARCHAR(200) NOT NULL,
    "name_en" VARCHAR(200),
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "employee_group_company_id_idx" ON "employee_group"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_group_company_id_code_key" ON "employee_group"("company_id", "code");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_employeeGroupId_fkey" FOREIGN KEY ("employeeGroupId") REFERENCES "employee_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_group" ADD CONSTRAINT "employee_group_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
