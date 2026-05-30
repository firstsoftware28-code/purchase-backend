-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "qty" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "company" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "partyNumber" TEXT NOT NULL,
    "givenPayment" DOUBLE PRECISION NOT NULL,
    "remainingPayment" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);
