import express from 'express';
import Playlist from '../db/playlist.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('playlist/index');
})

router.get('/table', (req, res) => {
    const query = req.query.q;

    if (query) {
        res.render('playlist/table', {
            playlists: Playlist.listFiltered(query),
        });
    } else {
        res.render('playlist/table', {
            playlists: Playlist.list(),
        });
    }
})

router.get('/form/:id?', (req, res) => {
    const id = req.params.id;
    
    if (id) {
        res.render('playlist/form', {
            title: "Update playlist",
            url: `/playlist/update/${id}`,
            playlist: Playlist.get(id),
        });
    } else {
        res.render('playlist/form', {
            title: "Create playlist",
            url: '/playlist/create',
        });
    }
})

router.post('/create', (req, res) => {
    const playlist = new Playlist();
    playlist.name = req.body.name;
    
    Playlist.create(playlist);
    
    res.send({
        message: "Playlist created",
    });
});

router.post('/update/:id', (req, res) => {
    const playlist = Playlist.get(req.params.id);
    playlist.name = req.body.name;
    
    Playlist.update(playlist);
    
    res.send({
        message: "Playlist updated",
    });
});

router.post('/delete/:id', (req, res) => {
    Playlist.delete(req.params.id);
    
    res.send({
        message: "Playlist deleted",
    });
});

export default router;
