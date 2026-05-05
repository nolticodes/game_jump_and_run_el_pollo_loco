class MiniChicken extends Moveableobject {
    damage = 5;
    offset = {
        top: 10,
        bottom:10,
        left: 10,
        right: 10,
    };
    speed = 0.65 + Math.random() * 0.5;
    MiniChickensWalking = [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ]


constructor() {
    super();
    this.loadImage("./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImagesToCacheJSON(this.MiniChickensWalking);

    this.x = 340 + Math.random() * 2500;
    this.y = 335;
    this.width = 100;
    this.height = 100;

    // this.animateImages();
}

    animateImages() {
        setInterval(() => {
            if (this.world && this.world.isPaused) return;
            this.playAnimation(this.MiniChickensWalking)
        }, 175);

        setInterval(() => {
            if (this.world && this.world.isPaused) return;
            this.otherDirection = false;
            this.moveLeft()
        }, 1000 / 60)
    }
}