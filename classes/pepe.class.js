class Pepe extends Moveableobject {

    speed = 5
    x = 80;
    y = 40;
    isDeadAnimationPlayed = false;
    walkingSound = new Audio("./assets/audio/pepe/running_2.mp3");
    isWalkingSoundPlaying = false;
    jumpingSound = new Audio("./assets/audio/pepe/jump.mp3");
    landingSound = new Audio("./assets/audio/pepe/landing.mp3");
    wasInAir = false;
    lastAnimation = "";
    pepeDiesSound = new Audio("./assets/audio/pepe/pepe_dead.mp3");
    lastKeyPressTime = new Date().getTime();
    pepeSleepsSound = new Audio ("./assets/audio/pepe/pepe_snoring.mp3")

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
    ]

    pepeIsHurt = [
        "./assets/img/2_character_pepe/4_hurt/H-41.png",
        "./assets/img/2_character_pepe/4_hurt/H-42.png",
        "./assets/img/2_character_pepe/4_hurt/H-43.png",
    ]

    pepeIsSpleeping = [
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
    ]

    world;

    offset = {
        top: 180,
        bottom: 20,
        left: 40,
        right: 60,
    }

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/1_idle/idle/I-1.png");
        // loadImagesToCache um die Bilder anfangs einmal zu initalisieren/laden
        this.loadImagesToCacheJSON(this.pepeStandingImages);
        this.loadImagesToCacheJSON(this.pepeWalkingImages);
        this.loadImagesToCacheJSON(this.pepeJumpingImages);
        this.loadImagesToCacheJSON(this.pepeIsDead);
        this.loadImagesToCacheJSON(this.pepeIsHurt);
        this.loadImagesToCacheJSON(this.pepeIsSpleeping);
        this.applyGravity();
        this.walkingSound.loop = true;
        this.walkingSound.volume = 1;
        this.walkingSound.playbackRate = 2;
        this.jumpingSound.volume = 0.3;
        this.landingSound.volume = 0.7
    }

    animateImages() {
        setInterval(() => {

            let currentlyInAir = this.isInAir();

            if (this.wasInAir && !currentlyInAir) {
                // 👉 Übergang: Luft → Boden
                this.landingSound.currentTime = 0;
                this.landingSound.play();
            }

            this.wasInAir = currentlyInAir;

            if (this.world.keyboard.right) {

                let screenX = this.x + this.world.camera_x;
                // 👉 Position von Pepe im sichtbaren Canvas

                let rightLimit = this.world.canvas.width - 200;

                if (screenX < rightLimit) {
                    this.otherDirection = false;
                    this.moveRight();
                }
            }

            if (this.world.keyboard.left && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            }

            if ((this.world.keyboard.up || this.world.keyboard.space) && !this.isInAir()) {
                this.jump();
                this.jumpingSound.currentTime = 0;
                this.jumpingSound.play();
            }

            let maxCameraX = this.world.level.level_end_x - this.world.canvas.width;
            let cameraTarget = this.x - 70;

            if (cameraTarget < 0) {
                cameraTarget = 0;
            }

            if (cameraTarget > maxCameraX) {
                cameraTarget = maxCameraX;
            }

            this.world.camera_x = -cameraTarget;

            if (!this.isDead() && !this.isInAir() && (this.world.keyboard.right || this.world.keyboard.left)) {
                if (!this.isWalkingSoundPlaying) {
                    this.walkingSound.play();
                    this.isWalkingSoundPlaying = true;
                }
            } else {
                if (this.isWalkingSoundPlaying) {
                    this.walkingSound.pause();
                    this.walkingSound.currentTime = 0;
                    this.isWalkingSoundPlaying = false;
                }
            }

        }, 1000 / 60);


        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.isInAir() && this.isSleeping()) {
                this.pepeIsSpleeping.currentTime = 0;
                this.pepeSleepsSound.play()
                this.playAnimation(this.pepeIsSpleeping, "Sleep")
            }
        }, 150)

        setInterval(() => {
            if (this.isDead() && !this.isDeadAnimationPlayed) {
                this.isDeadAnimationPlayed = true;
                this.pepeDiesSound.currentTime = 0;
                this.pepeDiesSound.play();

                let i = 0;

                let interval = setInterval(() => {
                    if (i < this.pepeIsDead.length) {
                        let path = this.pepeIsDead[i];
                        this.img = this.imageCache[path];
                        i++;
                    } else {
                        clearInterval(interval);

                        // letztes Bild stehen lassen
                        this.loadImage("./assets/img/2_character_pepe/5_dead/D-56.png")
                    }
                }, 125);
            }
        }, 100);

        setInterval(() => {
            if (!this.isDead() && this.isHurt()) {
                this.playAnimation(this.pepeIsHurt, "hurt");
            }
        }, 100);

        setInterval(() => {
            if (!this.isDead() && !this.isInAir() && (this.world.keyboard.right || this.world.keyboard.left)) {
                this.playAnimation(this.pepeWalkingImages, "walk");
            }
        }, 50);



        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && this.isInAir()) {
                this.playAnimationOnce(this.pepeJumpingImages, "jump");
            }
        }, 120);

        setInterval(() => {
            if (!this.world) return;

            if (!this.isDead() && !this.isHurt() && !this.isInAir() && !this.isSleeping() && !this.world.keyboard.right && !this.world.keyboard.left) {
                this.playAnimation(this.pepeStandingImages, "idle");
            }
        }, 175);
    }

    isJumpingOn(mo) {
        let pepeBottom = this.y + this.height - this.offset.bottom;
        let enemyTop = mo.y + mo.offset.top;

        return this.speedY < 0 &&
            pepeBottom >= enemyTop - 50 &&
            pepeBottom <= enemyTop + 50 &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
    }

    isSleeping() {
        let timePassed = new Date().getTime() - this.lastKeyPressTime;
        return timePassed > 5000 &&
            !this.world.keyboard.right &&
            !this.world.keyboard.left &&
            !this.world.keyboard.up &&
            !this.world.keyboard.down &&
            !this.world.keyboard.space &&
            !this.world.keyboard.t;
    }

} 