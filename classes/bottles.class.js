/**
 * Represents a collectible bottle that can be picked up and used as a throwable object.
 */
class Bottles extends Moveableobject {
    /**
     * Damage dealt when the bottle hits an enemy.
     */
    damage = 20;
    /**
     * Collision offset for more precise hit detection.
     */
    offset = {
        top: 20,
        bottom: 0,
        left: 40,
        right: 20,
    }

    /**
     * Animation frames for bottle rotation while being thrown.
     */ 
    bottleThrow = [
        "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]

    /**
     * Animation frames for bottle splash after impact.
     */
    bottleSplash = [
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    /**
     * Initializes bottle position, size and loads animation assets.
     */
    constructor() {
        super().loadImage("./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImagesToCacheJSON(this.bottleThrow);
        this.loadImagesToCacheJSON(this.bottleSplash);
        this.x = 600 + Math.random() * 1000;
        this.y = 330 + Math.random() * 10;
        this.width = 80;
        this.height = 100;
    }

    /**
     * Plays the splash animation and marks the bottle for deletion afterwards.
     */
    playSplashAnimation() {
        this.isBroken = true;
        let i = 0;
        let interval = setInterval(() => {
            if (i < this.bottleSplash.length) {
                let path = this.bottleSplash[i];
                this.img = this.imageCache[path];
                i++;
            } else {
                clearInterval(interval);
                this.markedForDeletion = true; // wichtig für später
            }
        }, 100);
    }
}