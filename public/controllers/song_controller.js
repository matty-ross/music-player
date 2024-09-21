import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = [
        'loading',
        'form',
        'table',
    ]

    connect() {
        this.#loadTable();
    }

    create() {
        this.#loadForm();
    }

    update(event) {
        const id = event.params.id;
        this.#loadForm(id);
    }

    async #loadTable() {
        this.loadingTarget.hidden = false;
        this.tableTarget.innerHTML = '';
        
        const response = await fetch('/song/table');
        this.tableTarget.innerHTML = await response.text();
        this.loadingTarget.hidden = true;
    }

    async #loadForm(id = null) {
        let url = '/song/form';
        if (id !== null) {
            url += `/${id}`;
        }
        
        const response = await fetch(url);
        this.formTarget.innerHTML = await response.text();

        const modal = new bootstrap.Modal(this.formTarget.querySelector('.modal'));
        modal.show();
    }
}
