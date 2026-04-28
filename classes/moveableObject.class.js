class Moveableobject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.2;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    energy = 100;
    lastHit = 0;
    lastAnimation = "";

    applyGravity() {
        setInterval(() => {
            if (this.isInAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 40) {
                this.y = 40;
                this.speedY = 0
            }
        }, 1000 / 25)
    }

    isInAir() {
        return this.y < 40
    }


    animationMoveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    playAnimation(images, animationName) {

        if (this.lastAnimation !== animationName) {
            this.currentImage = 0;
            this.lastAnimation = animationName;
        }

        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images, animationName) {
        if (this.lastAnimation !== animationName) {
            this.currentImage = 0;
            this.lastAnimation = animationName;
        }

        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            let lastImage = images[images.length - 1];
            this.img = this.imageCache[lastImage];
        }
    }


    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    };

    jump() {
        return this.speedY = 25
    };

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    lastHit = 0;

    hit(mo) {
        this.energy -= mo.damage || 0;

        if (this.energy < 0) {
            this.energy = 0;
        }

        this.lastHit = new Date().getTime();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0
    }

}