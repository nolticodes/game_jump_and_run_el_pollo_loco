/**
 * Represents a small enemy chicken with movement and walking animation.
 */
class MiniChicken extends Chicken {
    /**
     * Damage dealt to the player on collision.
     */
    damage = 5;

    /**
     * Collision offset for precise hit detection.
     */
    offset = {
        top: 30,
        bottom: 10,
        left: 10,
        right: 10,
    };

    /**
     * Movement speed with slight random variation.
     */
    speed = 0.65 + Math.random() * 0.5;

    /**
     * Animation frames for walking.
     */
    chickensWalking = [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ]

    /**
     * Initializes position, size and animation assets.
     */
    constructor() {
        super();
        this.loadImage("./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImagesToCacheJSON(this.chickensWalking);
        this.x = 340 + Math.random() * 2500;
        this.y = 360;
        this.width = 75;
        this.height = 75;

    }
}