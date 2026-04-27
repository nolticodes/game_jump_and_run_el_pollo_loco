class Endboss extends Moveableobject {

    height = 400
    width = 400
    y = 50
    x = 900

    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 80,
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