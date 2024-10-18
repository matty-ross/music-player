import { Application } from '@hotwired/stimulus';

import EntityController from './controllers/entity_controller.js';
import CollectionController from './controllers/collection_controller.js';


const application = Application.start();

application.register('entity', EntityController);
application.register('collection', CollectionController);
