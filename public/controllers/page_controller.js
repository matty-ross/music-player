import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static outlets = [
        'table',
        'modal',
        'toast',
    ]

    static values = {
        name: String,
    }

    openModal(event) {
        this.modalOutlet.show(event.params.url);
    }

    async onFormSubmitEnd(event) {
        const json = await event.detail.fetchResponse.response.json();

        this.modalOutlet.hide();
        this.toastOutlet.show(json.message);
        this.tableOutlet.reload();
    }

    async confirmAction(event) {
        const result = await Swal.fire({
            text: event.params.text,
            icon: 'question',
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            const response = await fetch(event.params.url, {
                method: 'POST',
            });
            const json = await response.json();
            
            this.toastOutlet.show(json.message);
            this.tableOutlet.reload();
        }
    }
}
