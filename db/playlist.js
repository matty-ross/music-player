import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

class Playlist {
    id = null;
    name = null;

    static list() {
        return database
            .prepare(`
                SELECT *
                FROM "playlist"
                ;
            `)
            .all()
        ;
    }

    static listFiltered(query) {
        return database
            .prepare(`
                SELECT *
                FROM "playlist"
                WHERE
                    "name" LIKE :query
                ;
            `)
            .all({
                query: `%${query}%`,
            })
        ;
    }

    static get(id) {
        return database
            .prepare(`
                SELECT *
                FROM "playlist"
                WHERE
                    "id" = :id
                ;
            `)
            .get({
                id: id,
            })
        ;
    }

    static create(playlist) {
        database
            .prepare(`
                INSERT INTO "playlist"
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
                name: playlist.name,
            })
        ;
    }

    static update(playlist) {
        database
            .prepare(`
                UPDATE "playlist"
                SET
                    "name" = :name
                WHERE
                    "id" = :id
                ;
            `)
            .run({
                id: playlist.id,
                name: playlist.name,
            })
        ;
    }

    static delete(id) {
        database
            .prepare(`
                DELETE FROM "playlist"
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

export default Playlist;
