-- AlterTable
ALTER TABLE "bookmarks" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visitCount" INTEGER NOT NULL DEFAULT 0;
