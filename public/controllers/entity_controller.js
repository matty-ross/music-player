import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'table',
        'form',
        'modal',
        'toast',
    ]

    static values = {
        name: String,
    }

    #modal = null;
    #toast = null;

    connect() {
        this.#loadTable();
        this.#modal = new bootstrap.Modal(this.modalTarget);
        this.#toast = new bootstrap.Toast(this.toastTarget);
    }

    filterTable(event) {
        const query = event.currentTarget.value;
        this.#loadTable(query);
    }

    create(event) {
        this.#loadForm();
        this.#modal.show();
    }

    #loadTable(query = null) {
        let url = `/${this.nameValue}/table`;
        if (query !== null) {
            url += `?q=${query}`;
        }
        
        this.tableTarget.setAttribute('src', url);
    }

    #loadForm(id = null) {
        let url = `/${this.nameValue}/form`;
        if (id !== null) {
            url += `/${id}`;
        }

        this.formTarget.setAttribute('src', url);
    }
}
