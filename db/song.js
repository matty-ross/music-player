import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

class Song {
    id = null;
    name = null;
    artist = null;
    file = null;

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

    static listFiltered(query) {
        return database
            .prepare(`
                SELECT *
                FROM "song"
                WHERE
                    ("name" || ' ' || "artist") LIKE :query
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
                        "name",
                        "artist",
                        "file"
                    )
                VALUES
                    (
                        :name,
                        :artist,
                        :file
                    )
                ;
            `)
            .run({
                name: song.name,
                artist: song.artist,
                file: song.file,
            })
        ;
    }

    static update(song) {
        database
            .prepare(`
                UPDATE "song"
                SET
                    "name" = :name,
                    "artist" = :artist,
                    "file" = :file
                WHERE
                    "id" = :id
                ;
            `)
            .run({
                id: song.id,
                name: song.name,
                artist: song.artist,
                file: song.file,
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
