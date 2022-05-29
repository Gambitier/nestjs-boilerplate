-- CreateTable
CREATE TABLE "Otp" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "userName" VARCHAR(30),
    "phoneWork" VARCHAR(15),
    "OTP" VARCHAR(6) NOT NULL,
    "validFrom" TIMESTAMPTZ(6),
    "validTo" TIMESTAMPTZ(6),
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),
    "deleted" TIMESTAMPTZ(6),

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);
