/**
 * Represents a collectible coin with floating animation.
 */
class Coins extends Moveableobject {

    /**
     * Collision offset for precise hit detection.
     */
    offset = {
        top: 55,
        bottom: 55,
        left: 55,
        right: 55,
    }

    /**
     * Initializes coin position, size and starts animation.
     */
    constructor() {
        super();
        this.loadImage("./assets/img/8_coin/coin_1.png");
        this.x = 600 + Math.random() * 1500;
        this.baseY = 300 - Math.random() * 200; 
        this.y = this.baseY;
        this.width = 150;
        this.height = 150;
        this.angle = 0; 
        this.animate();
    }

    /**
     * Animates the coin with a vertical sinus movement.
     */
    animate() {
        setInterval(() => {
            this.angle += 0.04; // Geschwindigkeit der Bewegung
            this.y = this.baseY + Math.sin(this.angle) * 25; // Radius = 50px
        }, 1000 / 60);
    }
}