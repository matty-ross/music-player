import path from 'node:path';

import express from 'express';
import multer from 'multer';

import Song from '../db/entity/song.js';
import SongRepository from '../db/repository/song.js';
import PlaylistRepository from '../db/repository/playlist.js';


const router = express.Router();


const UPLOAD_DIRECTORY = './public/upload/song';

const upload = multer({
    dest: UPLOAD_DIRECTORY,
});


function handleSubmittedFormData(song, req) {
    const name = req.body['name'];
    song.name = name;

    const artist = req.body['artist'];
    song.artist = artist;

    const file = req.file;
    if (file) {
        song.file = file.filename;
        song.extension = path.extname(file.originalname);
    }

    const playlistId = req.body['playlist-id'];
    if (playlistId == null) {
        song.playlistIds = [];
    } else if (!Array.isArray(playlistId)) {
        song.playlistIds = [playlistId];
    } else {
        song.playlistIds = playlistId;
    }
}


router.get('/', (req, res) => {
    res.render('song/index');
});

router.get('/table', (req, res) => {
    const searchQuery = req.query['q'] ?? '';

    res.render('song/table', {
        songs: SongRepository.list(searchQuery),
    });
});

router.get('/form{/:id}', (req, res) => {
    const id = req.params.id;
    
    if (id) {
        res.render('song/form', {
            title: "Update song",
            url: `/song/update/${id}`,
            song: SongRepository.get(id),
            playlists: PlaylistRepository.list(),
        });
    } else {
        res.render('song/form', {
            title: "Create song",
            url: '/song/create',
            playlists: PlaylistRepository.list(),
        });
    }
});

router.post('/create', upload.single('file'), (req, res) => {
    const song = new Song();
    handleSubmittedFormData(song, req);
    
    SongRepository.create(song);
    
    res.send({
        message: "Song created",
    });
});

router.post('/update/:id', upload.single('file'), (req, res) => {
    const song = SongRepository.get(req.params.id);
    handleSubmittedFormData(song, req);
    
    SongRepository.update(song);
    
    res.send({
        message: "Song updated",
    });
});

router.post('/delete/:id', (req, res) => {
    const song = SongRepository.get(req.params.id);
    
    SongRepository.delete(song);
    
    res.send({
        message: "Song deleted",
    });
});

router.get('/download/:id', (req, res) => {
    const song = SongRepository.get(req.params.id);

    if (!song.file) {
        res.sendStatus(404);
        return;
    }

    res.sendFile(song.file, {
        root: UPLOAD_DIRECTORY,
        headers: {
            'Content-Disposition': `attachment; filename=${song.file}${song.extension}`,
        },
    });
});

router.get('/player/:id', (req, res) => {
    const id = req.params.id;

    res.render('song/player', {
        url: `/song/download/${id}`,
        song: SongRepository.get(id),
    });
});


export default router;
