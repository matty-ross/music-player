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

    openForm(event) {
        const url = event.params.url;
        this.modalOutlet.show(url);
    }

    async onFormSubmitEnd(event) {
        const json = await event.detail.fetchResponse.response.json();

        this.modalOutlet.hide();
        this.toastOutlet.show(json.message);
        this.tableOutlet.reload();
    }
}
