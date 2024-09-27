import { Application } from '@hotwired/stimulus';

import SongController from './controllers/song_controller.js';
import PlaylistController from './controllers/playlist_controller.js';
import EntityController from './controllers/entity_controller.js';


const application = Application.start();


application.register('song', SongController);
application.register('playlist', PlaylistController);
application.register('entity', EntityController);
