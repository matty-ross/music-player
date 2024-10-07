import sqlite from 'node:sqlite';


const database = new sqlite.DatabaseSync('./db.sqlite3');


export default class Song {
    id = null;
    name = null;
    artist = null;
    file = null;
    playlists = null;

    
    fetchPlaylists() {
        this.playlists = Song.#selectSongPlaylists(this.id);
    }

    
    static list(searchQuery = '') {
        return Song.#selectSongs(searchQuery);
    }

    static get(id) {
        return Song.#selectSong(id);
    }

    static create(song) {
        const result = Song.#insertSong(song);
        song.id = result.lastInsertRowid;
        
        if (song.playlists !== null) {
            Song.#insertSongPlaylists(song);
        }
    }

    static update(song) {
        if (song.playlists !== null) {
            Song.#deleteSongPlaylists(song.id);
        }
        
        Song.#updateSong(song);
        
        if (song.playlists !== null) {
            Song.#insertSongPlaylists(song);
        }
    }

    static delete(id) {
        Song.#deleteSongPlaylists(id);
        Song.#deleteSong(id);
    }


    static #selectSongs(searchQuery) {
        return database
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
    }

    static #selectSong(id) {
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

    static #insertSong(song) {
        return database
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

    static #updateSong(song) {
        return database
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

    static #deleteSong(id) {
        return database
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

    static #selectSongPlaylists(songId) {
        return database
            .prepare(`
                SELECT *
                FROM "playlist"
                    JOIN "song_playlist" ON "song_playlist.playlist_id" = "playlist"."id"
                WHERE
                    "song_playlist"."song_id" = :songId
                ;
            `)
            .all({
                songId: songId,
            })
        ;
    }

    static #insertSongPlaylists(song) {
        const values = [];
        for (const playlist of song.playlists) {
            values.push(`
                (
                    ${song.id},
                    ${playlist.id}
                )
            `);
        }
        
        return database
            .prepare(`
                INSERT INTO "song_playlist"
                    (
                        "song_id",
                        "playlist_id"
                    )
                VALUES
                    ${values.join(',')}
                ;
            `)
            .run()
        ;
    }

    static #deleteSongPlaylists(songId) {
        return database
            .prepare(`
                DELETE FROM "song_playlist"
                WHERE
                    "song_id" = :songId
                ;
            `)
            .run({
                songId: songId,
            })
        ;
    }
}
