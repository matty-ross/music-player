export default class Song {
    id = null;
    name = null;
    artist = null;
    file = null;

    constructor(songDbObject) {
        this.id = songDbObject.id;
        this.name = songDbObject.name;
        this.artist = songDbObject.artist;
        this.file = songDbObject.file;
    }
}
