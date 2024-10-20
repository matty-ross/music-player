import sqlite from 'node:sqlite';

import Playlist from '../entity/playlist.js';


const database = new sqlite.DatabaseSync('./db.sqlite3');


export default class PlaylistRepository {
    
    static list(searchQuery = '') {
        const playlists = [];
        
        const dbPlaylists = PlaylistRepository.#selectPlaylists(searchQuery);
        for (const dbPlaylist of dbPlaylists) {
            const dbPlaylistSongIds = PlaylistRepository.#selectPlaylistSongIds(dbPlaylist['id']);
            const playlist = new Playlist(dbPlaylist, dbPlaylistSongIds);
            playlists.push(playlist);
        }
        
        return playlists;
    }
    
    static get(id) {
        const dbPlaylist = PlaylistRepository.#selectPlaylist(id);
        const dbPlaylistSongIds = PlaylistRepository.#selectPlaylistSongIds(id);
        
        const playlist = new Playlist(dbPlaylist, dbPlaylistSongIds);
        return playlist;
    }
    
    static create(playlist) {
        const result = PlaylistRepository.#insertPlaylist(playlist);
        playlist.id = result.lastInsertRowid;
        if (playlist.songIds.length > 0) {
            PlaylistRepository.#insertPlaylistSongIds(playlist);
        }
    }

    static update(playlist) {
        PlaylistRepository.#deletePlaylistSongIds(playlist);
        PlaylistRepository.#updatePlaylist(playlist);
        if (playlist.songIds.length > 0) {
            PlaylistRepository.#insertPlaylistSongIds(playlist);
        }
    }

    static delete(playlist) {
        PlaylistRepository.#deletePlaylistSongIds(playlist);
        PlaylistRepository.#deletePlaylist(playlist);
    }

    
    static #selectPlaylists(searchQuery) {
        return database
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
                    ("name")
                VALUES
                    (:name)
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

    static #deletePlaylist(playlist) {
        return database
            .prepare(`
                DELETE FROM "playlist"
                WHERE
                    "id" = :id
                ;
            `)
            .run({
                id: playlist.id,
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

    static #insertPlaylistSongIds(playlist) {
        const values = [];
        for (const songId of playlist.songIds) {
            values.push(`(${songId}, ${playlist.id})`);
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

    static #deletePlaylistSongIds(playlist) {
        return database
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
    }
}
