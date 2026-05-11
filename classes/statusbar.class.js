/**
 * Represents a status bar for health, coins, bottles or endboss energy.
 */
class Statusbar extends DrawableObject {

    x = 50;
    width = 175;
    height = 50;
    percentage = 100;

    imagesHealth = [
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    imagesCoins = [
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ];

    imagesBottles = [
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    imagesEndboss = [
        "./assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ]

    /**
     * Initializes the status bar type, position and starting percentage.
     */
    constructor(type, x, y, percentage) {
        super();
        this.y = y;
        this.x = x;
        this.percentage = percentage;
        if (type === "health") {
            this.images = this.imagesHealth;
        } else if (type === "coins") {
            this.images = this.imagesCoins;
        } else if (type === "bottles") {
            this.images = this.imagesBottles;
        } else if (type === "endboss") {
            this.images = this.imagesEndboss
        }
        this.loadImagesToCacheJSON(this.images);
        this.setPercentage(this.percentage);
    }

    /**
     * Updates the status bar percentage and displayed image.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the correct image index based on the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage > 80) return 5; 
        if (this.percentage > 60) return 4;
        if (this.percentage > 40) return 3;
        if (this.percentage > 20) return 2;
        if (this.percentage > 0) return 1; 
        return 0;                         
    }
}