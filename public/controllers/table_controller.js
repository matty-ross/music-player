import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'table',
    ]
    
    static values = {
        url: String,
    }

    connect() {
        this.#load();
    }

    filter(event) {
        this.#load(event.target.value);
    }

    reload() {
        this.tableTarget.reload();
    }

    #load(query = null) {
        let url = this.urlValue;
        if (query != null) {
            url += `?q=${query}`;
        }

        this.tableTarget.src = url;
    }
}
