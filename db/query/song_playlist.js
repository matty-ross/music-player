import sqlite from 'node:sqlite';


const database = new sqlite.DatabaseSync('./db.sqlite3');


function removeSongPlaylists(song) {
    const result = database
        .prepare(`
            DELETE FROM "song_playlist"
            WHERE
                "song_id" = :songId
            ;
        `)
        .run({
            songId: song.id,
        })
    ;

    song.playlists = [];
}

function removePlaylistSongs(playlist) {
    const result = database
        .prepare(`
            DELETE FROM "song_playlist"
            WHERE
                "playlist_id" = :playlistId
            ;
        `)
        .run({
            playlistId: playlist.id,
        })
    ;

    playlist.songs = [];
}
