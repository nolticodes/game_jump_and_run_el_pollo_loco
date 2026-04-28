class ThrowableObject extends Moveableobject {

    x = 100;
    y = 100;
    width = 80;
    height = 100;
    groundY = 330;
    isBroken = false

    constructor(x, y, otherDirection) {
        super();
        this.loadImage("./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");

        this.otherDirection = otherDirection;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;

        // 👉 Richtung setzen
        this.speedX = this.otherDirection ? -10 : 10;

        this.applyGravity();

        let moveInterval = setInterval(() => {
            if (!this.isBroken) {
                this.x += this.speedX;
            } else {
                clearInterval(moveInterval);
            }
        }, 50);
    }

    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isInAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (this.y > this.groundY) {
                this.y = this.groundY;
                this.speedY = 0;

                // 👉 Flasche ist am Boden
                this.breakBottle();

                clearInterval(gravityInterval); // Gravity stoppen
            }
        }, 1000 / 25);
    }

    isInAir() {
        return this.y < this.groundY;
    }

    breakBottle() {
        this.isBroken = true;

        // anderes Bild setzen
        this.loadImage("./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");

        // horizontale Bewegung stoppen
        this.speedX = 0;
    }
}