class Chicken extends Moveableobject {
    speed = 0.4 + Math.random() * 0.5;
    chickensWalking = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ]

    constructor() {
        super().loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImagesToCacheJSON(this.chickensWalking);

        this.x = 340 + Math.random() * 300;
        this.y = 335
        this.width = 100;
        this.height = 100;

        this.animateImages();
        
        this.animationMoveLeft() 
    }

    animateImages() {
        setInterval(() => {
            this.playAnimation(this.chickensWalking)
        }, 175)
    }

    

}