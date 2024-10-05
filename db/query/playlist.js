import sqlite from 'node:sqlite';


const database = new sqlite.DatabaseSync('./db.sqlite3');


function listPlaylists(searchQuery = '') {
    const playlists = database
        .prepare(`
            SELECT *
            FROM "playlist"
            WHERE
                "name" LIKE :searchQuery
            ;
        `)
        .all({
            searchQuery: `%${searchQuery}%`,
        })
    ;

    return playlists;
}

function getPlaylist(id) {
    const playlist = database
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

    return playlist;
}

function createPlaylist(playlist) {
    const result = database
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

    playlist.id = result.lastInsertRowid;
}

function updatePlaylist(playlist) {
    const result = database
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
        })
    ;
}

function deletePlaylist(id) {
    const result = database
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
