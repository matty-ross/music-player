import { Application } from '@hotwired/stimulus';

// import EntityController from './controllers/entity_controller.js';

import ModalController from './controllers/modal_controller.js';
import ToastController from './controllers/toast_controller.js';
import TableController from './controllers/table_controller.js';
import FormController from './controllers/form_controller.js';
import CollectionController from './controllers/collection_controller.js';


const application = Application.start();

// application.register('entity', EntityController);

application.register('modal', ModalController);
application.register('toast', ToastController);
application.register('table', TableController);
application.register('form', FormController);
application.register('collection', CollectionController);
