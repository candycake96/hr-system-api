-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "jobTitleId" UUID;

-- CreateTable
CREATE TABLE "job_title" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company_id" UUID NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name_th" VARCHAR(200) NOT NULL,
    "name_en" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_title_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_title_company_id_code_key" ON "job_title"("company_id", "code");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "job_title"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_title" ADD CONSTRAINT "job_title_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
