/**
 * Represents a throwable bottle object with movement, gravity and splash behavior.
 */
class ThrowableObject extends Bottles {
    groundY = 380;
    isBroken = false;
    markedForDeletion = false;

    /**
     * Creates a throwable bottle at a given position and direction.
     */
    constructor(x, y, otherDirection) {
        super();
        this.setPosition(x, y);
        this.setSize();
        this.otherDirection = otherDirection;
    }

    /**
     * Sets the bottle position.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the bottle size.
     */
    setSize() {
        this.width = 80;
        this.height = 100;
    }

    /**
     * Starts bottle throwing movement, gravity and rotation.
     */
    throw() {
        this.initThrowValues();
        this.applyGravity();
        this.startMoveInterval();
        this.startRotateInterval();
    }

    /**
     * Initializes movement values for the throw.
     */
    initThrowValues() {
        this.speedY = 12;
        this.speedX = this.otherDirection ? -8 : 8;
        this.acceleration = 2;
    }

    /**
     * Starts horizontal bottle movement.
     */
    startMoveInterval() {
        let moveInterval = setInterval(() => {
            if (this.world?.isPaused) return;

            if (!this.isBroken) {
                this.x += this.speedX;
            } else {
                clearInterval(moveInterval);
            }
        }, 1000 / 60);
    }

    /**
     * Starts bottle rotation animation.
     */
    startRotateInterval() {
        let rotateInterval = setInterval(() => {
            if (this.world?.isPaused) return;
            if (!this.isBroken) {
                this.playAnimation(this.bottleThrow);
            } else {
                clearInterval(rotateInterval);
            }
        }, 100);
    }

    /**
     * Plays the splash animation and marks the bottle for deletion.
     */
    playSplashAnimation() {
        this.isBroken = true;
        this.stopMovement();
        this.startSplashInterval();
    }

    /**
     * Stops bottle movement after impact.
     */
    stopMovement() {
        this.speedX = 0;
        this.speedY = 0;
    }

    /**
     * Starts the splash animation interval.
     */
    startSplashInterval() {
        let i = 0;
        let interval = setInterval(() => {
            if (this.world?.isPaused) return;

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

    /**
     * Applies gravity to the thrown bottle.
     */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.world?.isPaused) return;
            if (!this.isBroken) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                clearInterval(gravityInterval);
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the bottle is above the ground.
     */
    isInAir() {
        return this.y < this.groundY;
    }
}