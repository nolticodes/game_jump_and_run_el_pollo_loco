class SoundManager {
    constructor() {
        this.collectBottle = new Audio("./assets/audio/pepe/collect_bottle.mp3");
        this.collectCoin = new Audio("./assets/audio/pepe/collect_coin.mp3");
        this.splashBottle = new Audio("./assets/audio/pepe/bottle_splash.mp3");
        this.chickenDies = new Audio("./assets/audio/pepe/chicken_dies.mp3");
        this.endbossHit = new Audio("./assets/audio/pepe/endboss_hit.mp3");
        this.pepeHurt = new Audio("./assets/audio/pepe/pepe_hurt.mp3");
    }

    play(sound) {
        sound.currentTime = 0;
        sound.play();
    }
}