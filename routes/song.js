import express from 'express';
import Song from '../db/song.js';

const router = express.Router();

router.post('/create', (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Missing 'name'",
        });
        return;
    }
    
    const song = new Song();
    song.name = req.body.name;
    Song.create(song);
    
    res.send({
        message: "Song created",
    });
});

router.post('/update', (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "Missing 'id'",
        });
        return;
    }
    if (!req.body.name) {
        res.status(400).send({
            message: "Missing 'name'",
        });
        return;
    }
    
    const song = Song.get(req.body.id);
    song.name = req.body.name;
    Song.update(song);
    
    res.send({
        message: "Song updated",
    });
});

router.post('/delete', (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "Missing 'id'",
        });
        return;
    }
    
    Song.delete(req.body.id);
    
    res.send({
        message: "Song deleted",
    });
});

export default router;
