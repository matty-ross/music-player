import express from 'express';

import Playlist from '../db/entity/playlist.js';
import PlaylistRepository from '../db/repository/playlist.js';
import SongRepository from '../db/repository/song.js';


const router = express.Router();


router.get('/', (req, res) => {
    res.render('playlist/index');
})

router.get('/table', (req, res) => {
    const searchQuery = req.query.q ?? '';

    res.render('playlist/table', {
        playlists: PlaylistRepository.list(searchQuery),
    });
})

router.get('/form/:id?', (req, res) => {
    const id = req.params.id;
    
    if (id) {
        res.render('playlist/form', {
            title: "Update playlist",
            url: `/playlist/update/${id}`,
            playlist: PlaylistRepository.get(id),
            songs: SongRepository.list(),
        });
    } else {
        res.render('playlist/form', {
            title: "Create playlist",
            url: '/playlist/create',
            songs: SongRepository.list(),
        });
    }
})

router.post('/create', (req, res) => {
    const playlist = new Playlist();
    playlist.name = req.body.name;
    
    PlaylistRepository.create(playlist);
    
    res.send({
        message: "Playlist created",
    });
});

router.post('/update/:id', (req, res) => {
    const playlist = PlaylistRepository.get(req.params.id);
    playlist.name = req.body.name;
    
    PlaylistRepository.update(playlist);
    
    res.send({
        message: "Playlist updated",
    });
});

router.post('/delete/:id', (req, res) => {
    PlaylistRepository.delete(req.params.id);
    
    res.send({
        message: "Playlist deleted",
    });
});


export default router;
