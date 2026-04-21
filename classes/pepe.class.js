class Pepe extends Moveableobject {

    pepeWalkingImages = [
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
    ]

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImagesToCacheJSON(this.pepeWalkingImages);

        this.animateImages();
    }

    animateImages() {
        setInterval(() => {
            let i = this.currentImage % this.pepeWalkingImages.length
            let path = this.pepeWalkingImages[i]
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 175)
    }



    jump() {

    };
} 