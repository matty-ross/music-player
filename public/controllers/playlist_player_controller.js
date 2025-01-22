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

    static classes = [
        'activeSong',
    ]

    songIndexValueChanged() {
        if (this.songIndexValue !== -1) {
            const songTarget = this.songTargets[this.songIndexValue];
            
            this.playerTarget.src = songTarget.dataset.url;
            this.playerTarget.play();
            
            this.songTargets.forEach(songTarget => songTarget.classList.remove(...this.activeSongClasses));
            songTarget.classList.add(...this.activeSongClasses);
            songTarget.scrollIntoView({ block: 'nearest' });
        }
    }

    play(event) {
        this.songIndexValue = event.params.songIndex;
    }

    onSongEnded() {
        if (this.autoplayTarget.checked) {
            const songsCount = this.songTargets.length;
            this.songIndexValue = (this.songIndexValue + 1) % songsCount;
        }
    }
}
