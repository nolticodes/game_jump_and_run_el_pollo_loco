class Cloud extends Moveableobject {
    speed = 0.2

    constructor() {
        super().loadImage("./assets/img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 300;
        this.y = 20 + Math.random() * 20
        this.width = 480;
        this.height = 400;
    }

    move() {
        if (this.world && this.world.isPaused) return;

        this.x -= this.speed;
    }
}

class CloudSecond extends Moveableobject {
    speed = 0.15

    constructor() {
        super().loadImage("./assets/img/5_background/layers/4_clouds/2.png");

        this.x = Math.random() * 300;
        this.y = 20 + Math.random() * 20
        this.width = 480;
        this.height = 400;
    }
    move() {
        if (this.world && this.world.isPaused) return;

        this.x -= this.speed;
    }
}