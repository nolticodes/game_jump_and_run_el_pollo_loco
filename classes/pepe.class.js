class Pepe extends Moveableobject {

    speed = 5
    x = 80;
    y = 40;
    isDeadAnimationPlayed = false;

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

    world;

    offset = {
        top: 120,
        bottom: 30,
        left: 20,
        right: 50,
    }

    constructor() {
        super().loadImage("./assets/img/2_character_pepe/1_idle/idle/I-1.png");
        // loadImagesToCache um die Bilder anfangs einmal zu initalisieren/laden
        this.loadImagesToCacheJSON(this.pepeStandingImages);
        this.loadImagesToCacheJSON(this.pepeWalkingImages);
        this.loadImagesToCacheJSON(this.pepeJumpingImages);
        this.loadImagesToCacheJSON(this.pepeIsDead);
        this.loadImagesToCacheJSON(this.pepeIsHurt);
        this.applyGravity();

    }

    animateImages() {
        setInterval(() => {

            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            }

            if ((this.world.keyboard.up || this.world.keyboard.space) && !this.isInAir()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 70;
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead() && !this.isDeadAnimationPlayed) {
                this.isDeadAnimationPlayed = true;

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
                this.playAnimation(this.pepeIsHurt);
            }
        }, 100);

        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.isInAir() && (this.world.keyboard.right || this.world.keyboard.left)) {
                this.playAnimation(this.pepeWalkingImages);
            }
        }, 50);

        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && this.isInAir()) {
                this.playAnimation(this.pepeJumpingImages);
            }
        }, 175);

        setInterval(() => {
            if (!this.world) return;

            if (!this.isDead() && !this.isHurt() && !this.isInAir() && !this.world.keyboard.right && !this.world.keyboard.left) {
                this.playAnimation(this.pepeStandingImages);
            }
        }, 175);
    }

} 