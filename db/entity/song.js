export default class Song {
    id = null;
    name = null;
    artist = null;
    file = null;
    extension = null;
    playlistIds = [];

    constructor(dbSong = null, dbSongPlaylistIds = null) {
        if (dbSong) {
            this.id = dbSong['id'];
            this.name = dbSong['name'];
            this.artist = dbSong['artist'];
            this.file = dbSong['file'];
            this.extension = dbSong['extension'];
        }

        if (dbSongPlaylistIds) {
            for (const dbSongPlaylistId of dbSongPlaylistIds) {
                this.playlistIds.push(dbSongPlaylistId['playlist_id']);
            }
        }
    }
}
