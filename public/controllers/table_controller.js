import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static outlets = [
        'page',
    ]

    connect() {
        this.#load();
    }

    filter(event) {
        const query = event.target.value;
        this.#load(query);
    }

    #load(query = null) {
        let url = `/${this.pageOutlet.nameValue}/table`;
        if (query != null) {
            url += `?q=${query}`;
        }

        this.pageOutlet.tableTarget.setAttribute('src', url);
    }
}
