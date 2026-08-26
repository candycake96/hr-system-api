-- AlterTable
ALTER TABLE "branch" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "company_address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company_id" UUID NOT NULL,
    "address_type" VARCHAR(20) NOT NULL,
    "address_line" VARCHAR(255) NOT NULL,
    "subdistrict" VARCHAR(100),
    "district" VARCHAR(100),
    "province" VARCHAR(100),
    "postal_code" VARCHAR(10),
    "country_code" VARCHAR(2) NOT NULL DEFAULT 'TH',
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "company_address_company_id_idx" ON "company_address"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_address_company_id_address_type_key" ON "company_address"("company_id", "address_type");

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
