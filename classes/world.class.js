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
    playButton = new Buttons(20, 90, 50, 50, "play");
    pauseButton = new Buttons(20, 90, 50, 50, "pause")
    muteButton = new Buttons(20, 20, 50, 50, "mute");
    unmuteButton = new Buttons(20, 20, 50, 50, "unmute");
    isPaused = false
    gameStarted = false;
    isGameEnding = false;
    isGameEnded = false

    /**
     * Initializes the game world with canvas, assets, UI, managers and starts the render loop.
     */
    constructor(canvas) {
        this.initCanvas(canvas);
        this.initGameValues();
        this.initAssets();
        this.initButtons();
        this.initScreens();
        this.initManagers();
        this.enterStartScreen();
        this.draw();
    }

    /**
     * Sets up canvas context and keyboard reference.
     */
    initCanvas(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
    }

    /**
     * Initializes game-related values like max collectibles.
     */
    initGameValues() {
        this.maxCoins = this.level.coins.length;
        this.maxBottles = this.level.bottles.length;
    }

    /**
     * Loads static assets like images.
     */
    initAssets() {
        this.startScreenImage.src = "./assets/img/9_intro_outro_screens/start/startscreen_2.png";
    }

    /**
     * Creates main menu buttons and delegates HUD button creation.
     */
    initButtons() {
        let buttonWidth = 200;
        let gap = 20;
        let totalWidth = buttonWidth * 2 + gap;
        let startX = (this.canvas.width - totalWidth) / 2;

        this.startButton = new Buttons(startX, 30, buttonWidth, 60, "PLAY");
        this.controlsButton = new Buttons(startX + buttonWidth + gap, 30, buttonWidth, 60, "CONTROLS");
        this.initHudButtons();
    }

    /**
     * Creates in-game HUD buttons (pause, mute, fullscreen).
     */
    initHudButtons() {
        let size = 50;
        let margin = 10;

        this.fullscreenButton = new Buttons(this.canvas.width - size - margin, this.canvas.height - size - margin, size, size, "");
        this.fullscreenButton.icon = new Image();
        this.fullscreenButton.icon.src = "./assets/img/01_UI/fullscreen_icon.svg";
        this.pauseButton = new Buttons(75, this.canvas.height - size - margin, size, size, "");
        this.pauseButton.icon = new Image();
        this.pauseButton.icon.src = "./assets/img/01_UI/stop_icon.svg";
        this.muteButton = new Buttons(10, this.canvas.height - size - margin, size, size, "");
        this.muteButton.icon = new Image();
        this.muteButton.icon.src = "./assets/img/01_UI/unmute_icon.svg";
        if (this.sounds.muted) {
            this.muteButton.icon.src = "./assets/img/01_UI/mute_icon.svg";
        }
    }

    /**
     * Initializes all screen components (start, controls, pause, end).
     */
    initScreens() {
        this.startScreen = new StartScreen(this);
        this.controlsScreen = new ControlsScreen(this);
        this.pauseMenuScreen = new PauseMenuScreen(this);
        this.endScreen = new Endscreen(this);
    }

    /**
     * Initializes all manager classes (input, state, logic, mobile controls).
     */
    initManagers() {
        this.mobileControls = new MobileControls(this);
        this.gameLogic = new GameLogic(this);
        this.inputManager = new InputManager(this);
        this.gameStateManager = new GameStateManager(this);
    }

    /**
     * Unlocks audio playback after user interaction.
     */
    unlockAudio() {
        this.gameStateManager.unlockAudio();
    }

    /**
     * Starts the game via GameStateManager.
     */
    startGame() {
        this.gameStateManager.startGame();
    }

    /**
     * Returns to the start screen via GameStateManager.
     */
    backToStartpage() {
        this.gameStateManager.backToStartpage();
    }

    /**
     * Restarts the game via GameStateManager.
     */
    restartGame() {
        this.gameStateManager.restartGame();
    }

    /**
     * Switches to the start screen state.
     */
    enterStartScreen() {
        this.gameStateManager.enterStartScreen();
    }

    /**
     * Toggles pause state and sound playback.
     */
    togglePause() {
        this.gameStateManager.togglePause();
    }

    /**
     * Checks if the game is over.
     */
    isGameOver() {
        this.gameStateManager.checkGameOver();
    }

    /**
     * Assigns world reference to all entities and starts their animations.
     */
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

    /**
     * Main render loop that updates and draws the current game state.
     */
    draw() {
        this.mobileControls.updateVisibility();
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

    /**
     * Renders the full gameplay scene including world, UI and overlays.
     */
    drawPlayingScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawWorldObjects();
        this.drawFixedUI();
        this.drawDebugLines();
        this.drawOverlays();
    }

    /**
     * Draws all world objects affected by camera movement.
     */
    drawWorldObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.level.backgrounds.forEach(bg => {
            this.addToMap(bg);
        });
        this.level.clouds.forEach(cloud => {
            cloud.move();
            this.addToMap(cloud);
        });
        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });
        this.addToMap(this.character);
        this.throwableObject.forEach(throwableObject => {
            this.addToMap(throwableObject);
        });
        this.level.coins.forEach(coin => {
            this.addToMap(coin);
        });
        this.level.bottles.forEach(bottle => {
            this.addToMap(bottle);
        });
        this.ctx.translate(-this.camera_x, 0);
    }

    /** 
     * Draws fixed UI elements like status bars and buttons.
     */
    drawFixedUI() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        let endBoss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endBoss && endBoss.hasSeenPlayer) {
            this.addToMap(this.statusbarEndboss);
        }
        this.pauseButton.draw(this.ctx);
        this.muteButton.draw(this.ctx);
        this.fullscreenButton.draw(this.ctx);
    }

    /** 
     * Draws overlay screens like pause menu and endscreen.
     */
    drawOverlays() {
        if (this.isPaused) {
            this.pauseMenuScreen.draw();
        }
        if (this.isGameEnded) {
            this.endScreen.drawEndscreen();
        }
    }

    /**
     * Draws debug boundary lines for the endboss.
     */
    drawDebugLines() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (!endboss) return;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "transparent";
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(endboss.borderXLeft + this.camera_x, 0);
        this.ctx.lineTo(endboss.borderXLeft + this.camera_x, this.canvas.height);
        this.ctx.moveTo(endboss.borderXRight + this.camera_x, 0);
        this.ctx.lineTo(endboss.borderXRight + this.camera_x, this.canvas.height);
        this.ctx.stroke();
    }

    /**
     * Draws a moveable object with optional horizontal flip.
     */
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

    /**
     * Applies horizontal flip transformation before rendering an object.
     */
    flipImages(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /** 
     * Restores object position and canvas state after flipping.
     */
    flipImagesBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}