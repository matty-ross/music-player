import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'autoplay',
        'player',
        'song',
    ]

    static values = {
        songIndex: Number,
    }

    songIndexValueChanged() {
        if (this.songIndexValue === -1) {
            return;
        }

        const url = this.songTargets[this.songIndexValue].dataset.url;
        this.playerTarget.src = url;
        this.playerTarget.play();
    }

    play(event) {
        this.songIndexValue = event.params.songIndex;
    }

    onSongEnded() {
        const songsCount = this.songTargets.length;
        this.songIndexValue = (this.songIndexValue + 1) % songsCount;
    }
}
