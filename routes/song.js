import express from 'express';
import multer from 'multer';

import Song from '../db/entity/song.js';
import SongRepository from '../db/repository/song.js';
import PlaylistRepository from '../db/repository/playlist.js';


const router = express.Router();


const upload = multer({
    dest: './public/upload/song',
});


function handleSubmittedFormData(song, req) {
    const name = req.body['name'];
    song.name = name;

    const artist = req.body['artist'];
    song.artist = artist;

    const file = req.file;
    if (file) {
        song.file = req.file.path;
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
})

router.get('/table', (req, res) => {
    const searchQuery = req.query['q'] ?? '';

    res.render('song/table', {
        songs: SongRepository.list(searchQuery),
    });
})

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
})

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

    res.sendFile(song.file, {
        root: '.',
        headers: {
            'Content-Type': 'audo/mp3',
            'Content-Disposition': `attachment; filename=${req.params.id}.mp3`,
        }
    });
});


export default router;
