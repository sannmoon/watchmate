/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `TVSeries` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "watchedDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'WANT_WATCH'
);
INSERT INTO "new_Movie" ("id", "status", "title", "watchedDate") SELECT "id", "status", "title", "watchedDate" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "tvSeriesId" INTEGER NOT NULL,
    CONSTRAINT "Season_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "TVSeries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("id", "number", "tvSeriesId") SELECT "id", "number", "tvSeriesId" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
CREATE TABLE "new_TVSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "watchedDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'WANT_WATCH'
);
INSERT INTO "new_TVSeries" ("id", "status", "title", "watchedDate") SELECT "id", "status", "title", "watchedDate" FROM "TVSeries";
DROP TABLE "TVSeries";
ALTER TABLE "new_TVSeries" RENAME TO "TVSeries";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
