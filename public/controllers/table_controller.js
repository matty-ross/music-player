import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'table',
    ]
    
    static values = {
        name: String,
    }

    connect() {
        this.#load();
    }

    filter(event) {
        const query = event.target.value;
        this.#load(query);
    }

    reload() {
        this.tableTarget.reload();
    }

    #load(query = null) {
        let url = `/${this.nameValue}/table`;
        if (query != null) {
            url += `?q=${query}`;
        }

        this.tableTarget.setAttribute('src', url);
    }
}
