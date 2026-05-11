/**
 * Represents a game level containing all entities and environment elements.
 */
class Level {
    /**
     * List of enemy objects in the level.
     */
    enemies;

    /**
     * List of cloud objects for background animation.
     */
    clouds;

    /**
     * List of background layer objects.
     */
    backgrounds;

    /**
     * List of collectible coin objects.
     */
    coins;

    /**
     * List of collectible bottle objects.
     */
    bottles;

    /**
     * X-position marking the end of the level.
     */
    level_end_x = 4320;

    /**
     * Initializes the level with all required entities.
     */
    constructor(enemies, clouds, backgrounds, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins
        this.bottles = bottles
    }
}