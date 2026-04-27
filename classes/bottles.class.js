class Bottles extends Moveableobject{

    offset = {
        top: 35,
        bottom: 30,
        left: 35,
        right: 35,
    }

    constructor() {
        super().loadImage("./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");


        this.x = 600 + Math.random() * 1000;
        this.y = 330 + Math.random() * 10; 
        this.width = 80;
        this.height = 100;
    }
}