class World {
    ctx;
    canvas;
    gamestate = "startScreen"
    keyboard;
    camera_x = 0;
    character = new Pepe();
    level = level1;
    statusbarHealth = new Statusbar("health", 15, -10, 100);
    statusbarCoins = new Statusbar("coins", 15, 35, 0);
    statusbarBottles = new Statusbar("bottles", 15, 80, 0);
    statusbarEndboss = new Statusbar("endboss", 525, -4, 100);
    throwableObject = [];
    collectedCoins = 0;
    collectedBottles = 0;
    sounds = new SoundManager();
    startScreenImage = new Image()
    startButton = new Buttons(200, 30, 200, 60, "Play");
    controlsButton = new Buttons(200, 110, 200, 60, "Controls");
    fullscreenButton = new Buttons(20, 410, 50, 50, "");
    backButton = new Buttons(20, 20, 140, 50, "Back");

    gameStarted = false;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.maxCoins = this.level.coins.length;
        this.maxBottles = this.level.bottles.length;

        this.startScreenImage.src = "./assets/img/9_intro_outro_screens/start/startscreen_2.png";

        let buttonWidth = 200;
        let gap = 20;
        let totalWidth = buttonWidth * 2 + gap;
        let startX = (this.canvas.width - totalWidth) / 2;

        this.startButton = new Buttons(startX, 30, buttonWidth, 60, "PLAY");
        this.controlsButton = new Buttons(startX + buttonWidth + gap, 30, buttonWidth, 60, "CONTROLS");

        this.startScreen = new StartScreen(this);
        this.controlsScreen = new ControlsScreen(this);

        this.canvas.addEventListener("mousemove", (event) => {
            let rect = this.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            this.handleMouseMove(x, y);
        });

        this.canvas.addEventListener("click", (event) => {
            let rect = this.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            this.handleClick(x, y);
        });


        this.fullscreenButton = new Buttons(20, this.canvas.height - 70, 50, 50, "");
        this.fullscreenImage = new Image();
        this.fullscreenImage.src = "./assets/img/01_UI/fullscreen.svg"; // dein Icon
        this.draw();
    }


    startGame() {
        if (this.gameStarted) return;

        this.gameStarted = true;
        this.gamestate = "playingScreen";
        this.setWorld();
        this.run();
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

            let xOffset = this.character.otherDirection ? 20 : 100;
            let yOffset = 160;

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
                    this.sounds.play(this.sounds.chickenDies);
                    this.level.enemies.splice(index, 1);
                    this.character.speedY = 13; // kleiner Bounce nach oben
                } else if (enemy instanceof MiniChicken && this.character.isJumpingOn(enemy)) {
                    this.sounds.play(this.sounds.chickenDies);
                    this.level.enemies.splice(index, 1);
                    this.character.speedY = 8; // kleiner Bounce nach oben
                } else if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                    this.sounds.play(this.sounds.pepeHurt);
                    this.character.hit(enemy);
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            });
            this.throwableObject.forEach((bottle, bottleIndex) => {
                this.level.enemies.forEach((enemy, enemyIndex) => {
                    if (!bottle.isBroken && bottle.isColliding(enemy)) {
                        this.sounds.play(this.sounds.splashBottle);
                        if (enemy instanceof Endboss) {
                            enemy.hit(bottle)
                            if (enemy.energy < 0) {
                                enemy.energy = 0;
                            }
                            this.sounds.play(this.sounds.endbossHit);
                            this.statusbarEndboss.setPercentage(enemy.energy);
                            bottle.playSplashAnimation();
                        } else {
                            this.sounds.play(this.sounds.chickenDies);
                            this.level.enemies.splice(enemyIndex, 1);
                            bottle.playSplashAnimation();
                        }
                    }
                });
            });
        }, 200);

        setInterval(() => {
            for (let i = this.level.coins.length - 1; i >= 0; i--) {
                let coin = this.level.coins[i];
                if (this.character.isColliding(coin)) {
                    let collected = this.maxCoins - this.level.coins.length;
                    let percentage = (collected / this.maxCoins) * 100;
                    this.sounds.play(this.sounds.collectCoin);
                    this.level.coins.splice(i, 1);
                    this.statusbarCoins.setPercentage(percentage);
                }
            }
        }, 200);

        setInterval(() => {
            for (let i = this.level.bottles.length - 1; i >= 0; i--) {
                let bottle = this.level.bottles[i];
                if (this.character.isColliding(bottle)) {
                    let percentage = (this.collectedBottles / this.maxBottles) * 100;
                    this.sounds.play(this.sounds.collectBottle);
                    this.level.bottles.splice(i, 1);
                    this.collectedBottles++;
                    this.statusbarBottles.setPercentage(percentage);
                }
            }
        }, 200);
    }

    setWorld() {
        this.character.world = this;
        this.character.animateImages();

        this.level.enemies.forEach((enemy) => {
            enemy.world = this;

            if (enemy instanceof Chicken || enemy instanceof MiniChicken) {
                enemy.animateImages();
            }

            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gamestate === "startScreen") {
            this.startScreen.draw();
        } else if (this.gamestate === "playingScreen") {
            this.drawPlayingScreen();
        } else if (this.gamestate === "controlsScreen") {
            this.controlsScreen.draw();
        }

        requestAnimationFrame(() => this.draw());
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

    drawPlayingScreen() {
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
        let endBoss = this.level.enemies.find(enemy => enemy instanceof Endboss);

        if (endBoss && endBoss.hasSeenPlayer) {
            this.addToMap(this.statusbarEndboss);
        }
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
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);

        if (endboss) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(endboss.borderXLeft + this.camera_x, 0);
            this.ctx.lineTo(endboss.borderXLeft + this.camera_x, this.canvas.height);
            this.ctx.moveTo(endboss.borderXRight + this.camera_x, 0);
            this.ctx.lineTo(endboss.borderXRight + this.camera_x, this.canvas.height);
            this.ctx.stroke();
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

    handleMouseMove(x, y) {
        this.lastMouseX = x;
        this.lastMouseY = y;

        let hoverFullscreen = this.fullscreenButton.checkHover(x, y);

        if (this.gamestate === "startScreen") {
            let hoverStart = this.startButton.checkHover(x, y);
            let hoverControls = this.controlsButton.checkHover(x, y);

            this.canvas.style.cursor =
                hoverStart || hoverControls || hoverFullscreen ? "pointer" : "default";
        }

        else if (this.gamestate === "controlsScreen") {
            let hoverBack = this.backButton.checkHover(x, y);

            this.canvas.style.cursor =
                hoverBack || hoverFullscreen ? "pointer" : "default";
        }
    }

    handleClick(x, y) {
        if (this.gamestate === "startScreen") {
            if (this.startButton.checkHover(x, y)) {
                this.startGame();
            }

            if (this.controlsButton.checkHover(x, y)) {
                this.gamestate = "controlsScreen";
            }
        }

        else if (this.gamestate === "controlsScreen") {
            if (this.backButton.checkHover(x, y)) {
                this.gamestate = "startScreen";
            }
        }
        if (this.fullscreenButton.checkHover(x, y)) {
            this.toggleFullscreen();
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}