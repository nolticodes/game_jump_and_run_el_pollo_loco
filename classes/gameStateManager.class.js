class GameStateManager {
    constructor(world) {
        this.world = world;
    }

    unlockAudio() {
        if (this.world.gamestate === "startScreen" && !this.world.sounds.muted) {
            this.world.sounds.playLoop(this.world.sounds.startscreenSound);
        }
    }

    startGame() {
        if (window.innerWidth < 800 && window.innerHeight > window.innerWidth) {
            document.body.classList.add("show_rotate_hint");
            return;
        }
        document.body.classList.remove("show_rotate_hint");
        if (this.world.gameStarted) return;
        this.world.sounds.stop(this.world.sounds.startscreenSound);
        this.world.gameStarted = true;
        this.world.gamestate = "playingScreen";
        this.world.setWorld();
        this.world.gameLogic.start();
    }

    backToStartpage() {
        this.world.sounds.stop(this.world.sounds.gameWonSound);
        this.resetToStartpage();
    }

    resetToStartpage() {
        this.world.character.world = null;
        this.world.camera_x = 0;
        this.world.character = new Pepe();
        this.world.level = createLevel1();
        this.world.throwableObject = [];
        this.world.collectedCoins = 0;
        this.world.collectedBottles = 0;
        this.resetUI();
        this.world.gameStarted = false;
        this.world.isGameEnded = false;
        this.world.isPaused = false;
        this.world.isGameEnding = false;
        this.enterStartScreen();
        this.world.pauseButton.icon.src = "./assets/img/01_UI/stop_icon.svg";
    }

    restartGame() {
        this.world.sounds.stop(this.world.sounds.gameWonSound);
        this.resetGameObjects();
        this.resetUI();
        this.world.isPaused = false;
        this.world.gameStarted = true;
        this.world.gamestate = "playingScreen";
        this.world.isGameEnded = false;
        this.world.isGameEnding = false;
    }

    resetGameObjects() {
        this.world.character.world = null;
        this.world.camera_x = 0;
        this.world.character = new Pepe();
        this.world.level = createLevel1();
        this.world.throwableObject = [];
        this.world.collectedCoins = 0;
        this.world.collectedBottles = 0;
        this.world.setWorld();
    }

    resetUI() {
        this.world.statusbarHealth.setPercentage(100);
        this.world.statusbarCoins.setPercentage(0);
        this.world.statusbarBottles.setPercentage(0);
        this.world.statusbarEndboss.setPercentage(100);
        this.world.pauseButton.icon.src = "./assets/img/01_UI/stop_icon.svg";
    }

    enterStartScreen() {
        this.world.gamestate = "startScreen";
        if (!this.world.sounds.muted) {
            this.world.sounds.playLoop(this.world.sounds.startscreenSound);
        }
    }

    togglePause() {
        this.world.isPaused = !this.world.isPaused;
        if (this.world.isPaused) {
            this.world.sounds.pauseAll();
        } else {
            this.world.sounds.resumeAll();
        }
        this.world.pauseButton.icon.src = this.world.isPaused
            ? "./assets/img/01_UI/play_icon.svg"
            : "./assets/img/01_UI/stop_icon.svg";
    }

    checkGameOver() {
        let endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);

        if (!this.world.isGameEnding && (this.world.character.isDead() || endboss?.isDead())) {
            this.world.isGameEnding = true;
            this.world.sounds.pauseAll();
            setTimeout(() => {
                this.world.isGameEnded = true;
                this.world.isPaused = true;
                if (endboss?.isDead()) {
                    this.world.sounds.playLoop(this.world.sounds.gameWonSound);
                }
            }, 1500);
        }
    }
}