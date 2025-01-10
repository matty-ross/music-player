import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static outlets = [
        'modal',
        'toast',
        'table',
    ]

    static values = {
        name: String,
    }

    open(event) {
        const id = event.params.id;
        
        let url = `/${this.nameValue}/form`;
        if (id != null) {
            url += `/${id}`;
        }
        
        this.modalOutlet.show(url);
    }

    async submitEnd(event) {
        const json = await event.detail.fetchResponse.response.json();

        this.modalOutlet.hide();
        this.toastOutlet.show(json.message);
        this.tableOutlet.reload();
    }
}
