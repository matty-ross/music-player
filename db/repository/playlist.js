import sqlite from 'node:sqlite';

import Playlist from '../entity/playlist.js';


const database = new sqlite.DatabaseSync('./db.sqlite3');


export default class PlaylistRepository {
    
    static list(searchQuery = '') {
        const playlistDbObjects = PlaylistRepository.#selectPlaylists(searchQuery);
        return playlistDbObjects.map(playlistDbObject => new Playlist(playlistDbObject));
    }
    
    static get(id) {
        const playlistDbObject = PlaylistRepository.#selectPlaylist(id);
        return new Playlist(playlistDbObject);
    }
    
    static create(playlist) {
        const result = PlaylistRepository.#insertPlaylist(playlist);
        playlist.id = result.lastInsertRowid;
    }

    static update(playlist) {
        PlaylistRepository.#updatePlaylist(playlist);
    }

    static delete(id) {
        PlaylistRepository.#deletePlaylist(id);
    }

    
    static #selectPlaylists(searchQuery) {
        return database
            .prepare(`
                SELECT *
                FROM "playlist"
                WHERE
                    "name" LIKE :query
                ;
            `)
            .all({
                query: `%${searchQuery}%`,
            })
        ;
    }

    static #selectPlaylist(id) {
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

    static #insertPlaylist(playlist) {
        return database
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

    static #updatePlaylist(playlist) {
        return database
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

    static #deletePlaylist(id) {
        return database
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

    static #selectPlaylistSongIds(playlistId) {
        return database
            .prepare(`
                SELECT "song_id"
                FROM "song_playlist"
                WHERE
                    "playlist_id" = :playlistId
                ;
            `)
            .all({
                playlistId: playlistId,
            })
        ;
    }

    static #insertPlaylistSongIds(playlistId, songIds) {
        const values = [];
        for (const songId of songIds) {
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

    static #deletePlaylistSongs(playlistId) {
        return database
            .prepare(`
                DELETE FROM "song_playlist"
                WHERE
                    "playlist_id" = :playlistId
                ;
            `)
            .run({
                playlistId: playlistId,
            })
        ;
    }
}
