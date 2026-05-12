/**
 * Represents the endboss enemy with alert, movement, hurt and death behavior.
 */
class Endboss extends Moveableobject {
    damage = 15;
    height = 400;
    width = 400;
    y = 50;
    x = 1900;
    startX = 1900;
    energy = 100;
    lastAnimation = "";
    isDeadAnimationPlayed = false;
    borderXLeft = 1000;
    borderXRight = 2500;
    speed = 25;
    hasSeenPlayer = false;
    offset = {
        top: 150,
        bottom: 70,
        left: 60,
        right: 70,
    };

    endbossAlert = [
        "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    endbossWalking = [
        "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    endbossHurt = [
        "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    endbossAttack = [
        "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    endbossDead = [
        "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    /**
     * Initializes the endboss and loads all animation images.
     */
    constructor() {
        super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadAllImages();
    }

    /**
     * Loads all endboss animation images into cache.
     */
    loadAllImages() {
        this.loadImagesToCacheJSON(this.endbossAlert);
        this.loadImagesToCacheJSON(this.endbossWalking);
        this.loadImagesToCacheJSON(this.endbossHurt);
        this.loadImagesToCacheJSON(this.endbossAttack);
        this.loadImagesToCacheJSON(this.endbossDead);
    }

    /**
     * Starts all endboss behavior and animation intervals.
     */
    animate() {
        this.startAlertInterval();
        this.startHurtInterval();
        this.startDeadInterval();
        this.startMovementInterval();
    }

    /**
     * Starts the alert animation while the player has not been seen.
     */
    startAlertInterval() {
        setInterval(() => {
            if (this.world && this.world.isPaused) return;
            if (!this.isHurt() && !this.isDead() && !this.hasSeenPlayer) {
                this.playAnimation(this.endbossAlert, "alert");
            }
        }, 250);
    }

    /**
     * Starts the hurt animation while the endboss is hurt.
     */
    startHurtInterval() {
        setInterval(() => {
            if (this.world && this.world.isPaused) return;
            if (!this.isDead() && this.isHurt()) {
                this.playAnimation(this.endbossHurt, "hurt");
            }
        }, 100);
    }

    /**
     * Starts the death animation when the endboss dies.
     */
    startDeadInterval() {
        setInterval(() => {
            if (this.world && this.world.isPaused) return;
            if (this.isDead() && !this.isDeadAnimationPlayed) {
                this.playDeadAnimation();
            }
        }, 100);
    }

    /**
     * Plays the endboss death animation once.
     */
    playDeadAnimation() {
        this.isDeadAnimationPlayed = true;
        this.world.sounds.playLoop(this.world.sounds.endbossDiesSound);

        let i = 0;
        let interval = setInterval(() => {
            if (this.world && this.world.isPaused) return;
            if (i < this.endbossDead.length) {
                let path = this.endbossDead[i];
                this.img = this.imageCache[path];
                i++;
            } else {
                clearInterval(interval);
                this.loadImage("./assets/img/4_enemie_boss_chicken/5_dead/G26.png");
            }
        }, 125);
    }

    /**
     * Starts movement behavior based on player position.
     */
    startMovementInterval() {
        setInterval(() => {
            if (this.world && this.world.isPaused) return;
            if (this.isDead()) return;
            this.updatePlayerSeenState();
            this.handleMovementState();
        }, 200);
    }

    /**
     * Updates whether the endboss has seen the player.
     */
    updatePlayerSeenState() {
        if (this.isPlayerNear()) {
            this.hasSeenPlayer = true;
        }
    }

    /**
     * Handles movement toward the player or back to start position.
     */
    handleMovementState() {
        if (this.hasSeenPlayer && !this.isPlayerOutsideBossArea()) {
            this.moveTowardsPlayer();
        }
        if (this.hasSeenPlayer && this.isPlayerOutsideBossArea()) {
            this.moveBackToStartPosition();
        }
    }

    /**
     * Moves the endboss toward the player within its allowed area.
     */
    moveTowardsPlayer() {
        if (this.world.character.x < this.x && this.x > this.borderXLeft) {
            this.moveLeftTowardsPlayer();
        }
        if (this.world.character.x > this.x && this.x < this.borderXRight) {
            this.moveRightTowardsPlayer();
        }
    }

    /**
     * Moves the endboss left toward the player.
     */
    moveLeftTowardsPlayer() {
        this.otherDirection = false;
        this.playAnimation(this.endbossWalking, "walking");
        this.x -= this.speed;
    }

    /**
     * Moves the endboss right toward the player.
     */
    moveRightTowardsPlayer() {
        this.otherDirection = true;
        this.playAnimation(this.endbossWalking, "walking");
        this.x += this.speed;
    }

    /**
     * Checks if the player is close enough to trigger the endboss.
     */
    isPlayerNear() {
        let distance = Math.abs(this.x - this.world.character.x);
        return distance <= 500;
    }

    /**
     * Checks if the player is outside the endboss area.
     */
    isPlayerOutsideBossArea() {
        return this.world.character.x < this.borderXLeft ||
            this.world.character.x > this.borderXRight;
    }

    /**
     * Moves the endboss back to its start position.
     */
    moveBackToStartPosition() {
        if (this.x > this.startX) {
            this.moveBackLeft();
        }
        if (this.x < this.startX) {
            this.moveBackRight();
        }
        this.resetIfBackAtStart();
    }

    /**
     * Moves the endboss left toward its start position.
     */
    moveBackLeft() {
        this.otherDirection = false;
        this.playAnimation(this.endbossWalking, "walking");
        this.x -= this.speed;
    }

    /**
     * Moves the endboss right toward its start position.
     */
    moveBackRight() {
        this.otherDirection = true;
        this.playAnimation(this.endbossWalking, "walking");
        this.x += this.speed;
    }

    /**
     * Resets endboss state after reaching its start position.
     */
    resetIfBackAtStart() {
        if (Math.abs(this.x - this.startX) < 5) {
            this.x = this.startX;
            this.hasSeenPlayer = false;
        }
    }
}
