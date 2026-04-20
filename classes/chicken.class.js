class Chicken extends Moveableobject {
    constructor() {
        super().loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

        this.x = 340 + Math.random() * 300;
        this.y = 335
        this.width = 100;
        this.height = 100;
    }
}