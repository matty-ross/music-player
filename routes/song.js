import express from 'express';
import Song from '../db/song.js';

const router = express.Router();

function isValid(req, res, properties) {
    const missingProperties = properties
        .filter(property => !req.body[property])
    ;

    if (missingProperties.length > 0) {
        res.status(400).send({
            message: `Missing properties: ${missingProperties.join(', ')}`,
        });
        return false;
    }
    
    return true;
}

router.post('/create', (req, res) => {
    if (!isValid(req, res, [
        'name',
        'artist',
    ])) {
        return;
    }
    
    const song = new Song();
    song.name = req.body.name;
    song.artist = req.body.artist;
    song.filePath = ''; // TODO: file upload
    Song.create(song);
    
    res.send({
        message: "Song created",
    });
});

router.post('/update', (req, res) => {
    if (!isValid(req, res, [
        'id',
        'name',
        'artist',
    ])) {
        return;
    }
    
    const song = Song.get(req.body.id);
    song.name = req.body.name;
    song.artist = req.body.artist;
    song.filePath = ''; // TODO: file upload
    Song.update(song);
    
    res.send({
        message: "Song updated",
    });
});

router.post('/delete', (req, res) => {
    if (!isValid(req, res, [
        'id',
    ])) {
        return;
    }
    
    Song.delete(req.body.id);
    
    res.send({
        message: "Song deleted",
    });
});

export default router;
