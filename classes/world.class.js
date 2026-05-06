class World {
    ctx;
    canvas;
    gamestate = "startScreen"
    keyboard;
    camera_x = 0;
    character = new Pepe();
    level = createLevel1();
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
    playButton = new Buttons(20, 20, 50, 50, "play");
    pauseButton = new Buttons(20, 90, 50, 50, "pause")
    muteButton = new Buttons(20, 90, 50, 50, "mute");
    unmuteButton = new Buttons(20, 90, 50, 50, "unmute");

    isPaused = false

    gameStarted = false;
    isGameEnding = false;
    isGameEnded = false

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
        this.pauseMenuScreen = new PauseMenuScreen(this);
        this.endScreen = new Endscreen(this);

        this.canvas.addEventListener("mousemove", (event) => {
            let position = this.getCanvasMousePosition(event);
            this.handleMouseMove(position.x, position.y);
        });

        this.canvas.addEventListener("click", (event) => {
            let position = this.getCanvasMousePosition(event);
            this.handleClick(position.x, position.y);
        });


        let size = 50;
        let margin = 10;

        this.fullscreenButton = new Buttons(this.canvas.width - size - margin, this.canvas.height - size - margin, size, size, "");
        this.fullscreenButton.icon = new Image();
        this.fullscreenButton.icon.src = "./assets/img/01_UI/fullscreen_icon.svg";

        this.pauseButton = new Buttons(10, this.canvas.height - size - margin, size, size, "");
        this.pauseButton.icon = new Image();
        this.pauseButton.icon.src = "./assets/img/01_UI/stop_icon.svg";

        this.muteButton = new Buttons(75, this.canvas.height - size - margin, size, size, "");
        this.muteButton.icon = new Image();
        this.muteButton.icon.src = "./assets/img/01_UI/unmute_icon.svg";

        this.draw();
    }

    getCanvasMousePosition(event) {
        let rect = this.canvas.getBoundingClientRect();

        let canvasRatio = this.canvas.width / this.canvas.height;
        let rectRatio = rect.width / rect.height;

        let drawWidth;
        let drawHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (rectRatio > canvasRatio) {
            drawHeight = rect.height;
            drawWidth = drawHeight * canvasRatio;
            offsetX = (rect.width - drawWidth) / 2;
        } else {
            drawWidth = rect.width;
            drawHeight = drawWidth / canvasRatio;
            offsetY = (rect.height - drawHeight) / 2;
        }

        let x = (event.clientX - rect.left - offsetX) * (this.canvas.width / drawWidth);
        let y = (event.clientY - rect.top - offsetY) * (this.canvas.height / drawHeight);

        return { x, y };
    }


    startGame() {
        if (this.gameStarted) return;

        this.gameStarted = true;
        this.gamestate = "playingScreen";
        this.setWorld();
        this.run();
    }

    backToStartpage() {
        this.resetToStartpage();
    }

    resetToStartpage() {
        this.character.world = null;

        this.camera_x = 0;
        this.character = new Pepe();
        this.level = createLevel1();
        this.throwableObject = [];
        this.collectedCoins = 0;
        this.collectedBottles = 0;

        this.resetUI();

        this.gameStarted = false;
        this.isGameEnded = false
        this.isPaused = false;
        this.gamestate = "startScreen";
        this.isGameEnding = false

        this.pauseButton.icon.src = "./assets/img/01_UI/stop_icon.svg";
    }

    restartGame() {
        this.resetGameObjects();
        this.resetUI();
        this.isPaused = false;
        this.gameStarted = true;
        this.gamestate = "playingScreen";
        this.isGameEnded = false;
        this.isGameEnding = false;
        this.isPaused = false;
    }

    resetGameObjects() {
        this.character.world = null; // alter Pepe darf World nicht mehr steuern
        this.camera_x = 0;
        this.character = new Pepe();
        this.level = createLevel1(); // wichtig, dazu gleich mehr
        this.throwableObject = [];
        this.collectedCoins = 0;
        this.collectedBottles = 0;

        this.setWorld();
    }

    resetUI() {
        this.statusbarHealth.setPercentage(100);
        this.statusbarCoins.setPercentage(0);
        this.statusbarBottles.setPercentage(0);
        this.statusbarEndboss.setPercentage(100);

        this.pauseButton.icon.src = "./assets/img/01_UI/stop_icon.svg";
    }

    run() {
        this.checkCollision();

        setInterval(() => {
            if (this.isPaused) return;
            this.checkThrowableObjext();
            this.throwableObject = this.throwableObject.filter(bottle => !bottle.markedForDeletion);
        }, 200);
    }

    checkThrowableObjext() {
        if (this.isPaused) return

        if (this.keyboard.t && this.collectedBottles > 0) {
            this.sounds.play(this.sounds.throwingBottleSound)


            let xOffset = this.character.otherDirection ? 20 : 100;
            let yOffset = 160;

            let bottle = new ThrowableObject(
                this.character.x + xOffset,
                this.character.y + yOffset,
                this.character.otherDirection
            );

            bottle.world = this
            bottle.throw();
            this.throwableObject.push(bottle);

            this.collectedBottles--;

            let percentage = (this.collectedBottles / this.maxBottles) * 100;
            this.statusbarBottles.setPercentage(percentage);

            this.keyboard.t = false;
        }
    }

    checkCollision() {
        setInterval(() => {
            if (this.isPaused) return
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
            if (this.isPaused) return
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
            if (this.isPaused) return
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

        this.level.clouds.forEach((cloud) => {
            cloud.world = this;
            cloud.animationMoveLeft();
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.gamestate === "playingScreen") {
            this.isGameOver();
        }

        if (this.gamestate === "startScreen") {
            this.startScreen.draw();
        } else if (this.gamestate === "playingScreen") {
            this.drawPlayingScreen();
        } else if (this.gamestate === "controlsScreen") {
            this.controlsScreen.draw();
        } else if (this.gamestate === "endScreen") {
            this.endScreen.drawEndscreen();
        }

        requestAnimationFrame(() => this.draw());
    }

    isGameOver() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);

        if (!this.isGameEnding && (this.character.isDead() || endboss?.isDead())) {
            this.isGameEnding = true;

            this.sounds.pauseAll();

            setTimeout(() => {
                this.isGameEnded = true;
                this.isPaused = true;
            }, 1500);
        }
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
            cloud.move();        // 👉 Bewegung
            this.addToMap(cloud); // 👉 Rendering
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
        this.pauseButton.draw(this.ctx);
        this.muteButton.draw(this.ctx);
        this.fullscreenButton.draw(this.ctx);

        if (this.isPaused) {
            this.pauseMenuScreen.draw();
        }

        if (this.isGameEnded) {
            this.endScreen.drawEndscreen();
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
        let buttons = [this.startButton, this.controlsButton, this.backButton, this.playButton, this.fullscreenButton, this.pauseButton, this.muteButton, this.unmuteButton];
        let isHoveringAny = buttons.some(btn => btn && btn.checkHover(x, y));

        if (this.isGameEnded) {
            let hovering = this.endScreen.handleMouseMove(x, y);
            this.canvas.style.cursor = hovering ? "pointer" : "default";
            return;
        }

        if (this.isPaused) {
            isHoveringAny = this.pauseMenuScreen.handleMouseMove(x, y) || isHoveringAny;
        }
        this.canvas.style.cursor = isHoveringAny ? "pointer" : "default";
    }

    handleClick(x, y) {
        if (this.isGameEnded) {
            this.endScreen.handleClick(x, y);
            return;
        }

        if (this.isPaused) {
            this.pauseMenuScreen.handleClick(x, y);
            return;
        }

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

        if (this.muteButton.checkHover(x, y)) {
            this.sounds.toggleMute();

            this.muteButton.icon.src = this.sounds.muted
                ? "./assets/img/01_UI/mute_icon.svg"
                : "./assets/img/01_UI/unmute_icon.svg";
        }

        if (this.gamestate === "playingScreen" && this.pauseButton.checkHover(x, y)) {
            this.togglePause();
        }

    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.sounds.pauseAll();
        } else {
            this.sounds.resumeAll();
        }

        this.pauseButton.icon.src = this.isPaused
            ? "./assets/img/01_UI/play_icon.svg"
            : "./assets/img/01_UI/stop_icon.svg";
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}