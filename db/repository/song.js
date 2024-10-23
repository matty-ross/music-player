import sqlite from 'node:sqlite';

import Song from '../entity/song.js';


const database = new sqlite.DatabaseSync('./db.sqlite3');


export default class SongRepository {

    static list(searchQuery = '') {
        const songs = [];
        
        const dbSongs = SongRepository.#selectSongs(searchQuery);
        for (const dbSong of dbSongs) {
            const dbSongPlaylistIds = SongRepository.#selectSongPlaylistIds(dbSong['id']);
            const song = new Song(dbSong, dbSongPlaylistIds);
            songs.push(song);
        }

        return songs;
    }
    
    static get(id) {
        const dbSong = SongRepository.#selectSong(id);
        const dbSongPlaylistIds = SongRepository.#selectSongPlaylistIds(id);

        const song = new Song(dbSong, dbSongPlaylistIds);
        return song;
    }
    
    static create(song) {
        const result = SongRepository.#insertSong(song);
        song.id = result.lastInsertRowid;
        if (song.playlistIds.length > 0) {
            SongRepository.#insertSongPlaylistIds(song);
        }
    }

    static update(song) {
        SongRepository.#deleteSongPlaylistIds(song);
        SongRepository.#updateSong(song);
        if (song.playlistIds.length > 0) {
            SongRepository.#insertSongPlaylistIds(song);
        }
    }

    static delete(song) {
        SongRepository.#deleteSongPlaylistIds(song);
        SongRepository.#deleteSong(song);
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
                    ("name", "artist", "file")
                VALUES
                    (:name, :artist, :file)
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

    static #deleteSong(song) {
        return database
            .prepare(`
                DELETE FROM "song"
                WHERE
                    "id" = :id
                ;
            `)
            .run({
                id: song.id,
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

    static #insertSongPlaylistIds(song) {
        const values = [];
        for (const playlistId of song.playlistIds) {
            values.push(`(${song.id}, ${playlistId})`);
        }
        
        return database
            .prepare(`
                INSERT INTO "song_playlist"
                    ("song_id", "playlist_id")
                VALUES
                    ${values.join(',')}
                ;
            `)
            .run()
        ;
    }

    static #deleteSongPlaylistIds(song) {
        return database
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
    }
}
