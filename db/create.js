import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

database.exec(`
    CREATE TABLE "song" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "artist" VARCHAR(255) NOT NULL,
        "file_name" VARCHAR(255) NOT NULL,
        "file_path" VARCHAR(255) NOT NULL
    );
`);
