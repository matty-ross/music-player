import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'item',
    ]

    filter(event) {
        const search = event.target.value.toLowerCase();
        for (const item of this.itemTargets) {
            const itemText = item.innerText.toLowerCase();
            item.hidden = !itemText.includes(search);
        }
    }
}
