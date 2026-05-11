/**
 * Manages all game audio including playback, looping and mute control.
 */
class SoundManager {
    /**
     * Initializes all audio assets and default sound settings.
     */
    constructor() {
        this.startscreenSound = new Audio("./assets/audio/pepe/startscreen_sound.mp3")
        this.gameWonSound = new Audio("./assets/audio/pepe/game_won_sound.mp3")
        this.collectBottle = new Audio("./assets/audio/pepe/collect_bottle.mp3");
        this.splashBottle = new Audio("./assets/audio/pepe/bottle_splash.mp3");
        this.collectCoin = new Audio("./assets/audio/pepe/collect_coin.mp3");
        this.throwingBottleSound = new Audio("./assets/audio/pepe/throw_bottle.mp3");
        this.chickenDies = new Audio("./assets/audio/pepe/chicken_dies.mp3");
        this.endbossDiesSound = new Audio("./assets/audio/pepe/endboss_dies.mp3");
        this.endbossHit = new Audio("./assets/audio/pepe/endboss_hit.mp3");
        this.pepeHurt = new Audio("./assets/audio/pepe/pepe_hurt.mp3");
        this.pepeWalking = new Audio("./assets/audio/pepe/running_2.mp3");
        this.pepeJump = new Audio("./assets/audio/pepe/jump.mp3");
        this.pepeLanding = new Audio("./assets/audio/pepe/landing.mp3");
        this.pepeDead = new Audio("./assets/audio/pepe/pepe_dead.mp3");
        this.pepeSleeping = new Audio("./assets/audio/pepe/pepe_snoring.mp3");
        this.pepeWalking.loop = true;
        this.pepeWalking.volume = 1;
        this.pepeWalking.playbackRate = 2;
        this.pepeJump.volume = 0.3;
        this.pepeLanding.volume = 0.7;
        this.pepeSleeping.volume = 0.05
        this.startscreenSound.volume = 0.6
        this.allSounds = [
            this.collectBottle,
            this.splashBottle,
            this.collectCoin,
            this.chickenDies,
            this.endbossDiesSound,
            this.endbossHit,
            this.pepeHurt,
            this.pepeWalking,
            this.pepeJump,
            this.pepeLanding,
            this.pepeDead,
            this.pepeSleeping,
            this.throwingBottleSound,
            this.startscreenSound,
            this.gameWonSound,
        ];
        this.muted = false
        this.activeSounds = new Set();
    }

    /**
     * Plays a sound once from the beginning.
     */
    play(sound) {
        if (this.muted) return;

        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Plays a sound in a loop if it is not already playing.
     */       
    playLoop(sound) {
        if (this.muted) return;
        if (!sound.paused) return;

        sound.loop = true;

        sound.play().catch(() => {
            console.log("Audio wurde vom Browser blockiert, bis der User klickt.");
        });

        this.activeSounds.add(sound);
    }

    /**
     * Stops a sound and resets its playback position.
     */
    stop(sound) {
        sound.pause();
        sound.currentTime = 0;
        this.activeSounds.delete(sound);
    }

    /**
     * Toggles mute state for all sounds and stops playback if muted.
     */
    toggleMute() {
        this.muted = !this.muted;

        this.allSounds.forEach(sound => {
            sound.muted = this.muted;

            if (this.muted) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }

    /**
     * Pauses all currently active looping sounds.
     */
    pauseAll() {
        this.activeSounds.forEach(sound => {
            sound.pause();
        });
    }

    /**
     * Resumes all previously active looping sounds.
     */
    resumeAll() {
        if (this.muted) return;

        this.activeSounds.forEach(sound => {
            sound.play();
        });
    }
}