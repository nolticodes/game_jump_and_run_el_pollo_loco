class ThrowableObject extends Bottles {

    groundY = 380;
    isBroken = false;
    markedForDeletion = false;

    constructor(x, y, otherDirection) {
        super();

        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 100;
        this.otherDirection = otherDirection;

        this.throw();
    }

    throw() {
        this.speedY = 10;
        this.speedX = this.otherDirection ? -10 : 10;
        this.acceleration = 2;

        this.applyGravity();

        let moveInterval = setInterval(() => {
            if (!this.isBroken) {
                this.x += this.speedX;
            } else {
                clearInterval(moveInterval);
            }
        }, 1000 / 60);

        let rotateInterval = setInterval(() => {
            if (!this.isBroken) {
                this.playAnimation(this.bottleThrow);
            } else {
                clearInterval(rotateInterval);
            }
        }, 100);
    }

    playSplashAnimation() {
        this.isBroken = true;
        this.speedX = 0;
        this.speedY = 0;

        let i = 0;

        let interval = setInterval(() => {
            if (i < this.bottleSplash.length) {
                let path = this.bottleSplash[i];
                this.img = this.imageCache[path];
                i++;
            } else {
                clearInterval(interval);
                this.markedForDeletion = true;
            }
        }, 100);
    }

    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (!this.isBroken && (this.isInAir() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (this.y > this.groundY) {
                this.y = this.groundY;
                this.playSplashAnimation();
                clearInterval(gravityInterval);
            }
        }, 1000 / 25);
    }

    isInAir() {
        return this.y < this.groundY;
    }
}