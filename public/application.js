import { Application } from '@hotwired/stimulus';

import PageController from './controllers/page_controller.js';
import TableController from './controllers/table_controller.js';
import ModalController from './controllers/modal_controller.js';
import ToastController from './controllers/toast_controller.js';
import CollectionController from './controllers/collection_controller.js';


const application = Application.start();

application.register('page', PageController);
application.register('table', TableController);
application.register('modal', ModalController);
application.register('toast', ToastController);
application.register('collection', CollectionController);
