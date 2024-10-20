export default class Playlist {
    id = null;
    name = null;
    songIds = [];

    constructor(dbPlaylist = null, dbPlaylistSongIds = null) {
        if (dbPlaylist) {
            this.id = dbPlaylist['id'];
            this.name = dbPlaylist['name'];
        }
        
        if (dbPlaylistSongIds) {
            for (const dbPlaylistSongId of dbPlaylistSongIds) {
                this.songIds.push(dbPlaylistSongId['song_id']);
            }
        }
    }
}
