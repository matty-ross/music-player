import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = [
        'loading',
        'modal',
        'form',
        'table',
        'toast',
    ]

    #modal = null;
    #toast = null;

    connect() {
        this.#toast = new bootstrap.Toast(this.toastTarget);
        this.#loadTable();
    }

    filterTable(event) {
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

    async delete(event) {
        const id = event.params.id;
        
        const result = await Swal.fire({
            text: "Delete playlist?",
            icon: 'question',
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            const response = await fetch(`/playlist/delete/${id}`, {
                method: 'POST',
            });
            const json = await response.json();
    
            this.#showToast(json);

            this.#loadTable();
        }
    }

    async submitForm(event) {
        const form = event.currentTarget;
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(form)),
        });
        const json = await response.json();

        this.#showToast(json);

        this.#modal.hide();
        this.#loadTable();
    }

    async #loadTable(query = null) {
        this.loadingTarget.hidden = false;
        this.tableTarget.innerHTML = '';

        let url = '/playlist/table';
        if (query !== null) {
            url += `?q=${query}`;
        }
        
        const response = await fetch(url);
        this.tableTarget.innerHTML = await response.text();
        this.loadingTarget.hidden = true;
    }

    async #loadForm(id = null) {
        let url = '/playlist/form';
        if (id !== null) {
            url += `/${id}`;
        }
        
        const response = await fetch(url);
        this.formTarget.innerHTML = await response.text();

        this.#modal = new bootstrap.Modal(this.modalTarget);
        this.#modal.show();
    }

    #showToast(json) {
        this.toastTarget.querySelector('.toast-body').innerText = json.message;
        this.#toast.show();
    }
}
