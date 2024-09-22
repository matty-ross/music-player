import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = [
        'loading',
        'modal',
        'form',
        'table',
    ]

    connect() {
        this.#loadTable();
    }

    filter(event) {
        const query = event.currentTarget.value;
        this.#loadTable(query);
    }

    create(event) {
        this.#loadForm();
    }

    update(event) {
        const id = event.params.id;
        this.#loadForm(id);
    }

    async #loadTable(query = null) {
        this.loadingTarget.hidden = false;
        this.tableTarget.innerHTML = '';

        let url = '/song/table';
        if (query !== null) {
            url += `?q=${query}`;
        }
        
        const response = await fetch(url);
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

        const modal = new bootstrap.Modal(this.modalTarget);
        modal.show();
    }
}
