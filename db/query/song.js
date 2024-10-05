import sqlite from 'node:sqlite';


const database = new sqlite.DatabaseSync('./db.sqlite3');


function listSongs(searchQuery = '') {
    const songs = database
        .prepare(`
            SELECT *
            FROM "song"
            WHERE
                ("name" || ' ' || "artist") LIKE :searchQuery
            ;
        `)
        .all({
            searchQuery: `%${searchQuery}%`,
        })
    ;

    return songs;
}

function getSong(id) {
    const song = database
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

    return song;
}

function createSong(song) {
    const result = database
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

    song.id = result.lastInsertRowid;
}

function updateSong(song) {
    const result = database
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

function deleteSong(id) {
    const result = database
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
