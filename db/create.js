import database from './connection.js';

database.exec(`
    CREATE TABLE "song" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL
    );
`);
