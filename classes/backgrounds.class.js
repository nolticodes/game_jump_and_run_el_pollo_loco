/**
 * Represents a background layer segment.
 */
class BackgroundObject extends Moveableobject {

    /**
     * Creates a background object with image and position.
     */
    constructor(imagePath, x) {
        super();

        this.loadImage(imagePath);

        this.x = x;
        this.y = 0;
        this.width = 1440;
        this.height = 480;
    }
}

