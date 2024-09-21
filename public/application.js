import { Application } from '@hotwired/stimulus';
import SongController from './controllers/song_controller.js';

const application = Application.start();

application.register('song', SongController);
