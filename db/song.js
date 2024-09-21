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
                FROM "Song"
                ;
            `)
            .all()
        ;
    }

    static get(id) {
        return database
            .prepare(`
                SELECT *
                FROM "Song"
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
                INSERT INTO "Song"
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
                UPDATE "Song"
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
                DELETE FROM "Song"
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
