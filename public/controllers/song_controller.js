import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = [
        'table',
    ]

    connect() {
        this.#loadTable();
    }

    async #loadTable() {
        const response = await fetch('/song/table');
        this.tableTarget.innerHTML = await response.text();
    }
}
