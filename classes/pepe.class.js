/**
 * Represents the main playable character Pepe with movement, animations and sounds.
 */
class Pepe extends Moveableobject {
    width = 150;
    height = 350
    speed = 5;
    x = 80;
    y = 80;
    groundY = 80;
    isDeadAnimationPlayed = false;
    isWalkingSoundPlaying = false;
    isSleepingSoundPlaying = false;
    wasInAir = false;
    lastAnimation = "";
    lastKeyPressTime = new Date().getTime();
    world;
    offset = {
        top: 180,
        bottom: 30,
        left: 40,
        right: 60,
    };

    pepeStandingImages = [
        "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    pepeWalkingImages = [
        "./assets/img/2_character_pepe/2_walk/W-21.png",
        "./assets/img/2_character_pepe/2_walk/W-22.png",
        "./assets/img/2_character_pepe/2_walk/W-23.png",
        "./assets/img/2_character_pepe/2_walk/W-24.png",
        "./assets/img/2_character_pepe/2_walk/W-25.png",
        "./assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    pepeJumpingImages = [
        "./assets/img/2_character_pepe/3_jump/J-31.png",
        "./assets/img/2_character_pepe/3_jump/J-32.png",
        "./assets/img/2_character_pepe/3_jump/J-33.png",
        "./assets/img/2_character_pepe/3_jump/J-34.png",
        "./assets/img/2_character_pepe/3_jump/J-35.png",
        "./assets/img/2_character_pepe/3_jump/J-36.png",
        "./assets/img/2_character_pepe/3_jump/J-37.png",
        "./assets/img/2_character_pepe/3_jump/J-38.png",
        "./assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    pepeIsDead = [
        "./assets/img/2_character_pepe/5_dead/D-51.png",
        "./assets/img/2_character_pepe/5_dead/D-52.png",
        "./assets/img/2_character_pepe/5_dead/D-53.png",
        "./assets/img/2_character_pepe/5_dead/D-54.png",
        "./assets/img/2_character_pepe/5_dead/D-55.png",
        "./assets/img/2_character_pepe/5_dead/D-56.png",
    ];

    pepeIsHurt = [
        "./assets/img/2_character_pepe/4_hurt/H-41.png",
        "./assets/img/2_character_pepe/4_hurt/H-42.png",
        "./assets/img/2_character_pepe/4_hurt/H-43.png",
    ];

    pepeIsSleeping = [
        "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /**
     * Initializes Pepe with default image, cached animations and gravity.
     */
    constructor() {
        super().loadImage("./assets/img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadAllImages();
        this.applyGravity();
    }

    /**
     * Loads all Pepe animation images into cache.
     */
    loadAllImages() {
        this.loadImagesToCacheJSON(this.pepeStandingImages);
        this.loadImagesToCacheJSON(this.pepeWalkingImages);
        this.loadImagesToCacheJSON(this.pepeJumpingImages);
        this.loadImagesToCacheJSON(this.pepeIsDead);
        this.loadImagesToCacheJSON(this.pepeIsHurt);
        this.loadImagesToCacheJSON(this.pepeIsSleeping);
    }

    /**
     * Starts all movement and animation intervals.
     */
    animateImages() {
        this.startMovementInterval();
        this.startSleepingInterval();
        this.startDeadInterval();
        this.startHurtInterval();
        this.startWalkingInterval();
        this.startJumpingInterval();
        this.startIdleInterval();
    }

    /**
     * Starts movement, jump, camera and walking sound handling.
     */
    startMovementInterval() {
        setInterval(() => {
            if (!this.world || this.world.isPaused || this.world.isGameEnding) return;
            this.handleLandingSound();
            this.handleMovement();
            this.handleJump();
            this.updateCamera();
            this.handleWalkingSound();
        }, 1000 / 60);
    }

    /**
     * Plays landing sound when Pepe touches the ground after jumping.
     */
    handleLandingSound() {
        let currentlyInAir = this.isInAir();

        if (this.wasInAir && !currentlyInAir) {
            this.world.sounds.play(this.world.sounds.pepeLanding);
        }
        this.wasInAir = currentlyInAir;
    }

    /**
     * Handles horizontal player movement.
     */
    handleMovement() {
        if (this.world.keyboard.right) {
            this.movePepeRight();
        }
        if (this.world.keyboard.left && this.x > 0) {
            this.movePepeLeft();
        }
    }

    /**
     * Moves Pepe to the right while respecting the visible screen limit.
     */
    movePepeRight() {
        let screenX = this.x + this.world.camera_x;
        let rightLimit = this.world.canvas.width - 200;

        if (screenX < rightLimit) {
            this.otherDirection = false;
            this.moveRight();
        }
    }

    /**
     * Moves Pepe to the left.
     */
    movePepeLeft() {
        this.otherDirection = true;
        this.moveLeft();
    }

    /**
     * Handles jump input and jump sound.
     */
    handleJump() {
        if ((this.world.keyboard.up || this.world.keyboard.space) && !this.isInAir()) {
            this.jump();
            this.world.sounds.play(this.world.sounds.pepeJump);
        }
    }

    /**
     * Updates the camera position based on Pepe's position.
     */
    updateCamera() {
        let maxCameraX = this.world.level.level_end_x - this.world.canvas.width;
        let cameraTarget = this.x - 70;

        if (cameraTarget < 0) {
            cameraTarget = 0;
        }
        if (cameraTarget > maxCameraX) {
            cameraTarget = maxCameraX;
        }
        this.world.camera_x = -cameraTarget;
    }

    /**
     * Starts or stops walking sound depending on movement state.
     */
    handleWalkingSound() {
        if (this.shouldPlayWalkingSound()) {
            this.startWalkingSound();
        } else {
            this.stopWalkingSound();
        }
    }

    /**
     * Checks if walking sound should currently play.
     */
    shouldPlayWalkingSound() {
        return !this.isDead() &&
            !this.isInAir() &&
            (this.world.keyboard.right || this.world.keyboard.left);
    }

    /**
     * Starts the walking sound if it is not already playing.
     */
    startWalkingSound() {
        if (!this.isWalkingSoundPlaying) {
            this.world.sounds.playLoop(this.world.sounds.pepeWalking);
            this.isWalkingSoundPlaying = true;
        }
    }

    /**
     * Stops the walking sound if it is currently playing.
     */
    stopWalkingSound() {
        if (this.isWalkingSoundPlaying) {
            this.world.sounds.stop(this.world.sounds.pepeWalking);
            this.isWalkingSoundPlaying = false;
        }
    }

    /**
     * Starts sleeping animation and sleeping sound handling.
     */
    startSleepingInterval() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            if (this.shouldSleep()) {
                this.startSleepingSound();
                this.playAnimation(this.pepeIsSleeping, "sleep");
            } else {
                this.stopSleepingSound();
            }
        }, 150);
    }

    /**
     * Checks if Pepe should enter sleeping state.
     */
    shouldSleep() {
        return !this.isDead() &&
            !this.isHurt() &&
            !this.isInAir() &&
            this.isSleeping();
    }

    /**
     * Starts sleeping sound if it is not already playing.
     */
    startSleepingSound() {
        if (!this.isSleepingSoundPlaying) {
            this.world.sounds.playLoop(this.world.sounds.pepeSleeping);
            this.isSleepingSoundPlaying = true;
        }
    }

    /**
     * Stops sleeping sound if it is currently playing.
     */
    stopSleepingSound() {
        if (this.isSleepingSoundPlaying) {
            this.world.sounds.stop(this.world.sounds.pepeSleeping);
            this.isSleepingSoundPlaying = false;
        }
    }

    /**
     * Starts dead animation handling.
     */
    startDeadInterval() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            if (this.isDead() && !this.isDeadAnimationPlayed) {
                this.playDeadAnimation();
            }
        }, 100);
    }

    /**
     * Plays Pepe's dead animation once.
     */
    playDeadAnimation() {
        this.isDeadAnimationPlayed = true;
        this.world.sounds.play(this.world.sounds.pepeDead);

        let i = 0;
        let interval = setInterval(() => {
            if (i < this.pepeIsDead.length) {
                let path = this.pepeIsDead[i];
                this.img = this.imageCache[path];
                i++;
            } else {
                clearInterval(interval);
                this.loadImage("./assets/img/2_character_pepe/5_dead/D-56.png");
            }
        }, 125);
    }

    /**
     * Starts hurt animation handling.
     */
    startHurtInterval() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            if (!this.isDead() && this.isHurt()) {
                this.playAnimation(this.pepeIsHurt, "hurt");
            }
        }, 100);
    }

    /**
     * Starts walking animation handling.
     */
    startWalkingInterval() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            if (!this.isDead() && !this.isInAir() && (this.world.keyboard.right || this.world.keyboard.left)) {
                this.playAnimation(this.pepeWalkingImages, "walk");
            }
        }, 50);
    }

    /**
     * Starts jumping animation handling.
     */
    startJumpingInterval() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            if (!this.isDead() && !this.isHurt() && this.isInAir()) {
                this.playAnimationOnce(this.pepeJumpingImages, "jump");
            }
        }, 120);
    }

    /**
     * Starts idle animation handling.
     */
    startIdleInterval() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            if (this.shouldPlayIdleAnimation()) {
                this.playAnimation(this.pepeStandingImages, "idle");
            }
        }, 175);
    }

    /**
     * Checks if idle animation should currently play.
     */
    shouldPlayIdleAnimation() {
        return !this.isDead() &&
            !this.isHurt() &&
            !this.isInAir() &&
            !this.isSleeping() &&
            !this.world.keyboard.right &&
            !this.world.keyboard.left;
    }

    /**
     * Checks if Pepe is jumping onto another object.
     */
    isJumpingOn(mo) {
        let pepeBottom = this.y + this.height - this.offset.bottom;
        let enemyTop = mo.y + mo.offset.top;

        return this.speedY < 0 &&
            pepeBottom >= enemyTop - 50 &&
            pepeBottom <= enemyTop + 50 &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
    }

    /**
     * Checks if Pepe has been idle long enough to sleep.
     */
    isSleeping() {
        let timePassed = new Date().getTime() - this.lastKeyPressTime;

        return timePassed > 10000 &&
            !this.world.keyboard.right &&
            !this.world.keyboard.left &&
            !this.world.keyboard.up &&
            !this.world.keyboard.down &&
            !this.world.keyboard.space &&
            !this.world.keyboard.t;
    }
}