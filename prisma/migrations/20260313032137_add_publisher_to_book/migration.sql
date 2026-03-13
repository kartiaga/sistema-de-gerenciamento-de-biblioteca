-- AlterTable
ALTER TABLE "books" ADD COLUMN     "publisherId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
