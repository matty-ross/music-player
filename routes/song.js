import express from 'express';
import multer from 'multer';
import Song from '../db/song.js';

const router = express.Router();

const upload = multer({
    dest: './public/upload/song',
});

router.get('/', (req, res) => {
    res.render('song/index', {
    });
})

router.get('/table', (req, res) => {
    res.render('song/table', {
        songs: Song.list(),
    });
})

router.get('/form/:id?', (req, res) => {
    const id = req.params.id;
    
    if (id == null) {
        res.render('song/form', {
            url: '/song/create',
        });
    } else {
        res.render('song/form', {
            url: `/song/update/${id}`,
            song: Song.get(id),
        });
    }
})

router.post('/create', upload.single('file'), (req, res) => {
    const song = new Song();
    song.name = req.body.name;
    song.artist = req.body.artist;
    song.fileName = req.file.originalname;
    song.filePath = req.file.path;
    
    Song.create(song);
    
    res.send({
        message: "Song created",
    });
});

router.post('/update/:id', upload.single('file'), (req, res) => {
    const song = Song.get(req.params.id);
    song.name = req.body.name;
    song.artist = req.body.artist;
    song.fileName = req.file.originalname;
    song.filePath = req.file.path;
    
    Song.update(song);
    
    res.send({
        message: "Song updated",
    });
});

router.post('/delete/:id', (req, res) => {
    Song.delete(req.params.id);
    
    res.send({
        message: "Song deleted",
    });
});

export default router;
