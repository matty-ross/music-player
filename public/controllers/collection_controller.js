import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'item',
    ]

    filter(event) {
        const search = event.target.value.toLowerCase();
        
        for (const itemTarget of this.itemTargets) {
            const itemText = itemTarget.textContent.toLowerCase();
            itemTarget.hidden = !itemText.includes(search);
        }
    }
}
