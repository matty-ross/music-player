import express from 'express';

import PlaylistRepository from '../db/repository/playlist.js';
import SongRepository from '../db/repository/song.js';


const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {
        songs: SongRepository.list(),
        playlists: PlaylistRepository.list(),
    });
});


export default router;
