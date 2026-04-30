class Endboss extends Moveableobject {

    damage = 10
    height = 400
    width = 400
    y = 50
    x = 1900
    startX = 1900
    energy = 100
    lastAnimation = ""
    isDeadAnimationPlayed = false
    endbossDiesSound = new Audio("./assets/audio/pepe/endboss_dies.mp3");
    borderXLeft = 1000
    borderXRight = 2500
    speed = 25
    hasSeenPlayer = false

    offset = {
        top: 150,
        bottom: 70,
        left: 60,
        right: 70,
    }

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
    ]

    endbossDead = [
        "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    constructor() {
        super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImagesToCacheJSON(this.endbossAlert);
        this.loadImagesToCacheJSON(this.endbossWalking);
        this.loadImagesToCacheJSON(this.endbossHurt);
        this.loadImagesToCacheJSON(this.endbossAttack);
        this.loadImagesToCacheJSON(this.endbossDead);
    }

    animate() {
        setInterval(() => {
            if (!this.isHurt() && !this.isDead()) {
                this.playAnimation(this.endbossAlert, "alert");
            }
        }, 250)

        setInterval(() => {
            if (!this.isDead() && this.isHurt()) {
                this.playAnimation(this.endbossHurt, "hurt");
            }
        }, 100);

        setInterval(() => {
            if (this.isDead() && !this.isDeadAnimationPlayed) {
                this.isDeadAnimationPlayed = true;
                this.endbossDiesSound.currentTime = 0;
                this.endbossDiesSound.play();
                let i = 0;

                let interval = setInterval(() => {
                    if (i < this.endbossDead.length) {
                        let path = this.endbossDead[i];
                        this.img = this.imageCache[path];
                        i++;
                    } else {
                        clearInterval(interval);

                        // letztes Bild stehen lassen
                        this.loadImage("./assets/img/4_enemie_boss_chicken/5_dead/G26.png")
                    }
                }, 125);
            }
        }, 100);
        setInterval(() => {
            if (this.isPlayerNear()) {
                this.hasSeenPlayer = true
            }

            if (this.hasSeenPlayer && !this.isPlayerOutsideBossArea()) {
                if (this.world.character.x < this.x && this.x > this.borderXLeft) {
                    this.otherDirection = false
                    this.playAnimation(this.endbossWalking, "walking")
                    this.x -= this.speed
                }

                if (this.world.character.x > this.x && this.x < this.borderXRight) {
                    this.otherDirection = true
                    this.playAnimation(this.endbossWalking, "walking")
                    this.x += this.speed
                }
            }

            if (this.hasSeenPlayer && this.isPlayerOutsideBossArea()) {
                this.moveBackToStartPosition()
            }

        }, 200)
    }

    isPlayerNear() {
        let distance = Math.abs(this.x - this.world.character.x);
        return distance <= 500;
    }

    isPlayerOutsideBossArea() {
        return this.world.character.x < this.borderXLeft ||
            this.world.character.x > this.borderXRight;
    }

    moveBackToStartPosition() {
        
            if (this.x > this.startX) {
                this.otherDirection = false
                this.playAnimation(this.endbossWalking, "walking")
                this.x -= this.speed
            }

            if (this.x < this.startX) {
                this.otherDirection = true
                this.playAnimation(this.endbossWalking, "walking")
                this.x += this.speed
            }

            if (Math.abs(this.x - this.startX) < 5) {
                this.x = this.startX
                this.hasSeenPlayer = false;
            }
        
    }


}

