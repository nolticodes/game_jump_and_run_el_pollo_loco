class Pepe extends Moveableobject {

    speed = 5

    pepeStandingImages = [
        "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    pepeWalkingImages = [
        "./assets/img/2_character_pepe/2_walk/W-21.png",
        "./assets/img/2_character_pepe/2_walk/W-22.png",
        "./assets/img/2_character_pepe/2_walk/W-23.png",
        "./assets/img/2_character_pepe/2_walk/W-24.png",
        "./assets/img/2_character_pepe/2_walk/W-25.png",
        "./assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    world;

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImagesToCacheJSON(this.pepeStandingImages);
        this.loadImagesToCacheJSON(this.pepeWalkingImages);

        this.animateImages();
    }

animateImages() {
    setInterval(() => {
        if (this.world.keyboard.right) {
            this.x += this.speed;
            this.otherDirection = false;
        } else if (this.world.keyboard.left) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }, 1000 / 60);

    setInterval(() => {
        if (this.world.keyboard.right || this.world.keyboard.left) {
            let i = this.currentImage % this.pepeWalkingImages.length;
            let path = this.pepeWalkingImages[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }, 50);

    setInterval(() => {
        if (!this.world.keyboard.right && !this.world.keyboard.left) {
            let i = this.currentImage % this.pepeStandingImages.length;
            let path = this.pepeStandingImages[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }, 175);
}



    jump() {

    };
} 