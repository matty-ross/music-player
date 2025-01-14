import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'modal',
        'modalContent',
    ]

    #modal = null;

    connect() {
        this.#modal = new bootstrap.Modal(this.modalTarget);
    }

    async show(url) {
        this.modalContentTarget.setAttribute('src', url);
        await this.modalTarget.loaded;

        this.#modal.show();
    }

    hide() {
        this.#modal.hide();
    }
}