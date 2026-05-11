/**
 * Represents a cloud object that moves slowly across the background.
 */
class Cloud extends Moveableobject {

    /**
     * Creates a cloud with a given image and speed.
     */
    constructor(imagePath, speed) {
        super();
        this.loadImage(imagePath);
        this.speed = speed;
        this.initPosition();
        this.setSize();
    }

    /**
     * Initializes a random start position.
     */
    initPosition() {
        this.x = Math.random() * 300;
        this.y = 20 + Math.random() * 20;
    }

    /**
     * Sets the cloud dimensions.
     */
    setSize() {
        this.width = 480;
        this.height = 400;
    }

    /**
     * Moves the cloud horizontally.
     */
    move() {
        if (this.world && this.world.isPaused) return;
        this.x -= this.speed;
    }
}