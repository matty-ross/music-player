import express from 'express';

import Playlist from '../db/entity/playlist.js';
import PlaylistRepository from '../db/repository/playlist.js';
import SongRepository from '../db/repository/song.js';


const router = express.Router();


function handleSubmittedFormData(playlist, req) {
    const name = req.body['name'];
    playlist.name = name;

    const songId = req.body['song-id'];
    if (songId == null) {
        playlist.songIds = [];
    } else if (!Array.isArray(songId)) {
        playlist.songIds = [songId];
    } else {
        playlist.songIds = songId;
    }
}


router.get('/', (req, res) => {
    res.render('playlist/index');
})

router.get('/table', (req, res) => {
    const searchQuery = req.query['q'] ?? '';

    res.render('playlist/table', {
        playlists: PlaylistRepository.list(searchQuery),
    });
})

router.get('/form{/:id}', (req, res) => {
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
    handleSubmittedFormData(playlist, req);
    
    PlaylistRepository.create(playlist);
    
    res.send({
        message: "Playlist created",
    });
});

router.post('/update/:id', (req, res) => {
    const playlist = PlaylistRepository.get(req.params.id);
    handleSubmittedFormData(playlist, req);
    
    PlaylistRepository.update(playlist);
    
    res.send({
        message: "Playlist updated",
    });
});

router.post('/delete/:id', (req, res) => {
    const playlist = PlaylistRepository.get(req.params.id);
    
    PlaylistRepository.delete(playlist);
    
    res.send({
        message: "Playlist deleted",
    });
});


export default router;
