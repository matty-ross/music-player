import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'table',
        'form',
        'modal',
        'toast',
        'message',
    ]

    static values = {
        name: String,
    }

    #modal = null;
    #toast = null;

    connect() {
        this.tableTarget.setAttribute('src', `/${this.nameValue}/table`);
        
        this.#modal = new bootstrap.Modal(this.modalTarget);
        this.#toast = new bootstrap.Toast(this.toastTarget);
    }

    filterTable(event) {
        const query = event.target.value;
        this.tableTarget.setAttribute('src', `/${this.nameValue}/table?q=${query}`);
    }

    async loadForm(event) {
        const id = event.params.id;
        if (id != null) {
            this.formTarget.setAttribute('src', `/${this.nameValue}/form/${id}`);
        } else {
            this.formTarget.setAttribute('src', `/${this.nameValue}/form`);
        }

        await this.formTarget.loaded;
        this.#modal.show();
    }

    async formSubmitted(event) {
        const json = await event.detail.fetchResponse.response.json();
        this.messageTarget.innerText = json.message;

        this.#modal.hide();
        this.#toast.show();

        this.tableTarget.reload();
    }

    async delete(event) {
        const id = event.params.id;
        
        const result = await Swal.fire({
            text: `Delete ${this.nameValue}?`,
            icon: 'question',
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            const response = await fetch(`/song/delete/${id}`, {
                method: 'POST',
            });
            const json = await response.json();
    
            this.messageTarget.innerText = json.message;
            this.#toast.show();

            this.tableTarget.reload();
        }
    }
}
