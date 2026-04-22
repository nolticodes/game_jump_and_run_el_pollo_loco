class Endboss extends Moveableobject {

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
        this.x = 700

    }
}