import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static outlets = [
        'page',
    ]

    #modal = null;
    #toast = null;

    connect() {
        this.#modal = new bootstrap.Modal(this.pageOutlet.modalTarget);
        this.#toast = new bootstrap.Toast(this.pageOutlet.toastTarget);
    }

    open() {
    }

    submitEnd() {
    }

    #load(id = null) {
        let url = `/${this.pageOutlet.nameValue}/form`;
        if (id != null) {
            url += `/${id}`;
        }

        this.pageOutlet.modalContent.setAttribute('src', url);
    }
}
