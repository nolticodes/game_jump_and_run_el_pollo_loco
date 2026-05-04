class SoundManager {
    constructor() {
        this.collectBottle = new Audio("./assets/audio/pepe/collect_bottle.mp3");
        this.splashBottle = new Audio("./assets/audio/pepe/bottle_splash.mp3");
        this.collectCoin = new Audio("./assets/audio/pepe/collect_coin.mp3");

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
        this.pepeSleeping.volume = 0.2
    }

    play(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    playLoop(sound) {
        sound.play();
    }

    stop(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}