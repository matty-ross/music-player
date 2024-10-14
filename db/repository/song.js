import sqlite from 'node:sqlite';

import Song from '../entity/song.js';


const database = new sqlite.DatabaseSync('./db.sqlite3');


export default class SongRepository {

    static list(searchQuery = '') {
        const songDbObjects = SongRepository.#selectSongs(searchQuery);
        return songDbObjects.map(songDbObject => new Song(songDbObject));
    }
    
    static get(id) {
        const songDbObject = SongRepository.#selectSong(id);
        return new Song(songDbObject);
    }
    
    static create(song) {
        const result = SongRepository.#insertSong(song);
        song.id = result.lastInsertRowid;
    }

    static update(song) {
        SongRepository.#updateSong(song);
    }

    static delete(id) {
        SongRepository.#deleteSong(id);
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

    static #selectSongPlaylistIds(songId) {
        return database
            .prepare(`
                SELECT "playlist_id"
                FROM "song_playlist"
                WHERE
                    "song_id" = :songId
                ;
            `)
            .all({
                songId: songId,
            })
        ;
    }

    static #insertSongPlaylistIds(songId, playlistIds) {
        const values = [];
        for (const playlistId of playlistIds) {
            values.push(`
                (
                    ${songId},
                    ${playlistId}
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
