import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

class Song {
    id = null;
    name = null;

    static list() {
        return database
            .prepare(`
                SELECT *
                FROM "song"
                ;
            `)
            .all()
        ;
    }

    static get(id) {
        return database
            .prepare(`
                SELECT *
                FROM "song"
                WHERE
                    "id" = :id
                ;
            `)
            .get({
                id: id,
            })
        ;
    }

    static create(song) {
        database
            .prepare(`
                INSERT INTO "song"
                    (
                        "name"
                    )
                VALUES
                    (
                        :name
                    )
                ;
            `)
            .run({
                name: song.name,
            })
        ;
    }

    static update(song) {
        database
            .prepare(`
                UPDATE "song"
                SET
                    "name" = :name
                WHERE
                    "id" = :id
                ;
            `)
            .run({
                id: song.id,
                name: song.name,
            })
        ;
    }

    static delete(id) {
        database
            .prepare(`
                DELETE FROM "song"
                WHERE
                    "id" = :id
                ;
            `)
            .run({
                id: id,
            })
        ;
    }
}

export default Song;
