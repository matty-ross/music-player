import express from 'express';
import multer from 'multer';

import Song from '../db/entity/song.js';
import SongRepository from '../db/repository/song.js';


const router = express.Router();


const upload = multer({
    dest: './public/upload/song',
});


router.get('/', (req, res) => {
    res.render('song/index');
})

router.get('/table', (req, res) => {
    const searchQuery = req.query.q ?? '';

    res.render('song/table', {
        songs: SongRepository.list(searchQuery),
    });
})

router.get('/form/:id?', (req, res) => {
    const id = req.params.id;
    
    if (id) {
        res.render('song/form', {
            title: "Update song",
            url: `/song/update/${id}`,
            song: SongRepository.get(id),
        });
    } else {
        res.render('song/form', {
            title: "Create song",
            url: '/song/create',
        });
    }
})

router.post('/create', upload.single('file'), (req, res) => {
    const song = new Song();
    song.name = req.body.name;
    song.artist = req.body.artist;
    song.file = req.file.path;
    
    SongRepository.create(song);
    
    res.send({
        message: "Song created",
    });
});

router.post('/update/:id', upload.single('file'), (req, res) => {
    const song = SongRepository.get(req.params.id);
    song.name = req.body.name;
    song.artist = req.body.artist;
    song.file = req.file.path;
    
    SongRepository.update(song);
    
    res.send({
        message: "Song updated",
    });
});

router.post('/delete/:id', (req, res) => {
    SongRepository.delete(req.params.id);
    
    res.send({
        message: "Song deleted",
    });
});


export default router;
