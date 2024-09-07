import express from 'express';

const app = express();

app.listen(80);

app.use(express.static('./public/'));
app.use(express.urlencoded({ extended: true }));

import songRoutes from './routes/song.js';
app.use('/song', songRoutes);
