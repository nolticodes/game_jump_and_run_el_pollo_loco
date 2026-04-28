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

    constructor(type, y, percentage) {
        super();

        this.y = y;
        this.percentage = percentage;

        if (type === "health") {
            this.images = this.imagesHealth;
        } else if (type === "coins") {
            this.images = this.imagesCoins;
        } else if (type === "bottles") {
            this.images = this.imagesBottles;
        }

        this.loadImagesToCacheJSON(this.images);
        this.setPercentage(this.percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage > 80) return 5; // 100%
        if (this.percentage > 60) return 4; // 80%
        if (this.percentage > 40) return 3; // 60%
        if (this.percentage > 20) return 2; // 40%
        if (this.percentage > 0) return 1;  // 20%
        return 0;                           // 0%
    }
}