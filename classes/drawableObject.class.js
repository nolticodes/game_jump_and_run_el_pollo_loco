/**
 * Base class for all drawable objects with image rendering and caching functionality.
 */
class DrawableObject {
    x = 80;
    y = 40;
    width = 200;
    height = 400;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image from a given path.
     */ 
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images into the cache for animations.
     */
    loadImagesToCacheJSON(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img
        });
    };

    /**
     * Draws the object image on the canvas.
     */
    drawMoveableObjects(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a debug collision rectangle for specific object types.
     */
    drawRectangle(ctx) {
        if (this instanceof Pepe || this instanceof MiniChicken || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
}