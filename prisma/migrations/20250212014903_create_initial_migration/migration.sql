-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "watchedDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TVSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "watchedDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "tvSeriesId" INTEGER NOT NULL,
    CONSTRAINT "Season_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "TVSeries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
