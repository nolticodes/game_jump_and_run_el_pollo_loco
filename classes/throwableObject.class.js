class ThrowableObject extends Moveableobject {
    
    x = 100;
    y = 100;
    width = 80;
    height = 100;
    groundY = 330;

    constructor(x, y) {
        super().loadImage("./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.throw(x,y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 50);
    }

    applyGravity() {
        setInterval(() => {
            if (this.isInAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (this.y > this.groundY) {
                this.y = this.groundY;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    isInAir() {
        return this.y < this.groundY;
    }
}