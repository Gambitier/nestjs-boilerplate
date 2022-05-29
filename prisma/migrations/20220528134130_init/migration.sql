-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "mobileNumber" VARCHAR(15) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "prefix" VARCHAR(10) NOT NULL,
    "gender" VARCHAR(50),
    "dateOfBirth" TIMESTAMPTZ(6),
    "firstName" VARCHAR(50) NOT NULL,
    "middleName" VARCHAR(50),
    "lastName" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");
