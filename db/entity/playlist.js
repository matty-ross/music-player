export default class Playlist {
    id = null;
    name = null;
    
    constructor(playlistDbObject) {
        this.id = playlistDbObject.id;
        this.name = playlistDbObject.name;
    }
}
