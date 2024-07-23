-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
