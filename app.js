import express from 'express';
import routesSong from './routes/song.js';

const app = express();

app.listen(80);

app.use(express.static('./public/'));
app.use(express.urlencoded({ extended: true }));

app.use('/song', routesSong);
