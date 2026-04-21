class Chicken extends Moveableobject {
    chickensWalking = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ]

    currentImage = 0

    constructor() {
        super().loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImagesToCacheJSON(this.chickensWalking);

        this.x = 340 + Math.random() * 300;
        this.y = 335
        this.width = 100;
        this.height = 100;

        this.animateImages()
    }

    animateImages() {
        setInterval(() => {
            let i = this.currentImage % this.chickensWalking.length
            let path = this.chickensWalking[i]
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 175)
    }
}