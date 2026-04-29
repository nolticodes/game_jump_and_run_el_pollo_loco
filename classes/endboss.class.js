class Endboss extends Moveableobject {

    damage = 10
    height = 400
    width = 400
    y = 50
    x = 1900
    energy = 100

    offset = {
        top: 150,
        bottom: 70,
        left: 60,
        right: 70,
    }

    endbossAlert = [
        "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    constructor() {
        super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImagesToCacheJSON(this.endbossAlert);
        this.animate()
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.endbossAlert);
        }, 250)
    }
}