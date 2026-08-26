-- CreateTable
CREATE TABLE "employee" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company_id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "department_id" UUID NOT NULL,
    "position_id" UUID NOT NULL,
    "side_id" UUID,
    "employee_code" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(50),
    "email" VARCHAR(150),
    "phone" VARCHAR(30),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_code_key" ON "employee"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");
