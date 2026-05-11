/**
 * Base class for all moveable game objects with physics, animation and collision logic.
 */
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
    lastHit = 0;

    /**
     * Applies gravity to the object and updates vertical movement.
     */
    applyGravity() {
        setInterval(() => {
            if (this.world && this.world.isPaused) return;

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

    /**
     * Checks if the object is currently above ground level.
     */
    isInAir() {
        return this.y < 40
    }

    /**
     * Moves the object continuously to the left.
     */
    animationMoveLeft() {
        setInterval(() => {
            if (this.world && this.world.isPaused) return;
            this.x -= this.speed;
        }, 1000 / 60)
    }

    /**
     * Plays a looping animation sequence.
     */
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

    /**
     * Plays an animation once and stops on the last frame.
     */
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

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    };

    /**
     * Triggers a jump by setting vertical speed.
     */
    jump() {
        return this.speedY = 25
    };

    /**
     * Checks collision with another moveable object.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Applies damage from another object and updates state.
     */
    hit(mo) {
        this.energy -= mo.damage || 0;

        if (this.energy < 0) {
            this.energy = 0;
        }

        let now = new Date().getTime();

        this.lastHit = now;

        // 👉 NEU: Sleep-Timer resetten
        this.lastKeyPressTime = now;
    }

    /**
     * Checks if the object is currently in a hurt state.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object has no remaining energy.
     */
    isDead() {
        return this.energy == 0
    }

}