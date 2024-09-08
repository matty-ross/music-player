import database from './connection.js';

class Song {
    id = null;
    name = null;

    static list() {
        const result = database
            .prepare(`
                SELECT *
                FROM "song"
                ;
            `)
            .all()
        ;
        return result;
    }

    static create(song) {
        const result = database
            .prepare(`
                INSERT INTO "song"
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
                name: song.name,
            })
        ;
        song.id = result.lastInsertRowid;
    }
}

export default Song;
