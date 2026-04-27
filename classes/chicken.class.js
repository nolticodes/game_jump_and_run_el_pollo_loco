class Chicken extends Moveableobject {

    damage = 5
    offset = {
        top: 30,
        bottom: 0,
        left: 0,
        right: 55,
    }

    speed = 0.4 + Math.random() * 0.5;
    chickensWalking = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ]

    

    constructor() {
        super().loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImagesToCacheJSON(this.chickensWalking);

        this.x = 340 + Math.random() * 2500;
        this.y = 335
        this.width = 100;
        this.height = 100;

        this.animateImages();
        
        
    }

    animateImages() {
        setInterval(() => {
            this.playAnimation(this.chickensWalking)
        }, 175);

        setInterval(() => {
            this.otherDirection = false;
            this.moveLeft()
        }, 1000 / 60)
    }

    

}