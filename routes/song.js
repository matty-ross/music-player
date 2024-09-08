import express from 'express';
import Song from '../db/song.js';

const router = express.Router();

router.get('/', (req, res) => {
    const songs = Song.list();
    return res.json(songs);
});

router.post('/', (req, res) => {
    const song = new Song();
    song.name = req.body.name;
    Song.create(song);
    return res.json(song);
});

export default router;
