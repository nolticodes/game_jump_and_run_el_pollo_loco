class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    character = new Pepe();
    level = level1;
    statusbarHealth = new Statusbar("health", -10, 100);
    statusbarCoins = new Statusbar("coins", 35, 0);
    statusbarBottles = new Statusbar("bottles", 80, 0);
    throwableObject = []
    collectedCoins = 0;
    collectedBottles = 0;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld()
        this.run()
        this.maxCoins = this.level.coins.length;
        this.maxBottles = this.level.bottles.length;
    }

    run() {
        this.checkCollision();

        setInterval(() => {
            this.checkThrowableObjext();
            this.throwableObject = this.throwableObject.filter(bottle => !bottle.markedForDeletion);
        }, 200);
    }

    checkThrowableObjext() {
        if (this.keyboard.t && this.collectedBottles > 0) {

            let xOffset = this.character.otherDirection ? -100 : 100;
            let yOffset = 160

            let bottle = new ThrowableObject(
                this.character.x + xOffset,
                this.character.y + yOffset,
                this.character.otherDirection
            );

            this.throwableObject.push(bottle);

            this.collectedBottles--;

            let percentage = (this.collectedBottles / this.maxBottles) * 100;
            this.statusbarBottles.setPercentage(percentage);

            this.keyboard.t = false;
        }
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {

                if (enemy instanceof Chicken && this.character.isJumpingOn(enemy)) {
                    this.level.enemies.splice(index, 1);
                    this.character.speedY = 15; // kleiner Bounce nach oben
                } else if (this.character.isColliding(enemy)) {
                    this.character.hit(enemy);
                    this.statusbarHealth.setPercentage(this.character.energy);
                    console.log("Collision with", this.character.energy);
                }

            });
            this.throwableObject.forEach((bottle, bottleIndex) => {
                this.level.enemies.forEach((enemy, enemyIndex) => {

                    if (!bottle.isBroken && bottle.isColliding(enemy)) {

                        // Enemy entfernen
                        this.level.enemies.splice(enemyIndex, 1);

                        // Splash starten
                        bottle.playSplashAnimation();
                    }

                });
            });
        }, 200);

        setInterval(() => {
            for (let i = this.level.coins.length - 1; i >= 0; i--) {
                let coin = this.level.coins[i];

                if (this.character.isColliding(coin)) {
                    this.level.coins.splice(i, 1);

                    let collected = this.maxCoins - this.level.coins.length;
                    let percentage = (collected / this.maxCoins) * 100;

                    this.statusbarCoins.setPercentage(percentage);
                }
            }
        }, 200);

        setInterval(() => {
            for (let i = this.level.bottles.length - 1; i >= 0; i--) {
                let bottle = this.level.bottles[i];

                if (this.character.isColliding(bottle)) {
                    this.level.bottles.splice(i, 1);

                    this.collectedBottles++;

                    let percentage = (this.collectedBottles / this.maxBottles) * 100;
                    this.statusbarBottles.setPercentage(percentage);
                }
            }
        }, 200);
    }

    setWorld() {
        this.character.world = this;
        this.character.animateImages();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.level.backgrounds.forEach(bg => {
            this.addToMap(bg);
        });

        this.level.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0)

        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        this.addToMap(this.character);

        this.throwableObject.forEach((throwableObject) => {
            this.addToMap(throwableObject);
        });

        this.level.coins.forEach(coin => {
            this.addToMap(coin)
        })

        this.level.bottles.forEach(bottle => {
            this.addToMap(bottle)
        })

        this.ctx.translate(-this.camera_x, 0)

        let self = this
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImages(mo);
        }

        mo.drawMoveableObjects(this.ctx);
        mo.drawRectangle(this.ctx);

        if (mo.otherDirection) {
            this.flipImagesBack(mo);
        }
    }

    flipImages(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImagesBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}