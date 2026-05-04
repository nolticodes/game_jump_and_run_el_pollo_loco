class Chicken extends Moveableobject {

    damage = 10
    offset = {
        top: 10,
        bottom:10,
        left: 10,
        right: 10,
    }

    speed = 0.4 + Math.random() * 0.5;
    chickensWalking = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ]
    isDead = false

    

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