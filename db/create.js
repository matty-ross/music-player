import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

database.exec(`
    CREATE TABLE "Song" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "artist" VARCHAR(255) NOT NULL,
        "fileName" VARCHAR(255) NOT NULL,
        "filePath" VARCHAR(255) NOT NULL
    );
`);
