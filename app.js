import express from 'express';

import routesIndex from './routes/index.js';
import routesSong from './routes/song.js';
import routesPlaylist from './routes/playlist.js';


const app = express();

app.listen(80);

app.use(express.static('./public/'));
app.use(express.urlencoded({
    extended: true,
}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', routesIndex);
app.use('/song', routesSong);
app.use('/playlist', routesPlaylist);
