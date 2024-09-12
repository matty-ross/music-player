import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

class Song {
    id = null;
    name = null;
    artist = null;
    fileName = null;
    filePath = null;

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
                        "name",
                        "artist",
                        "file_name",
                        "file_path"
                    )
                VALUES
                    (
                        :name,
                        :artist,
                        :fileName,
                        :filePath
                    )
                ;
            `)
            .run({
                name: song.name,
                artist: song.artist,
                fileName: song.fileName,
                filePath: song.filePath,
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
                    "file_name" = :fileName,
                    "file_path" = :filePath
                WHERE
                    "id" = :id
                ;
            `)
            .run({
                id: song.id,
                name: song.name,
                artist: song.artist,
                fileName: song.fileName,
                filePath: song.filePath,
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
