import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

database.exec(`
    CREATE TABLE "song" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "artist" VARCHAR(255) NOT NULL,
        "file" VARCHAR(255) NOT NULL
    );
`);

database.exec(`
    CREATE TABLE "playlist" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL
    );
`);
