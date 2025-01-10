import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'toast',
        'toastBody',
    ]

    #toast = null;

    connect() {
        this.#toast = new bootstrap.Toast(this.toastTarget);
    }

    show(message) {
        this.toastBodyTarget.textContent = message;
        
        this.#toast.show();
    }
}
