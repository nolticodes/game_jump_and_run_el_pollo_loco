class InputManager {
    constructor(world) {
        this.world = world;
        this.canvas = world.canvas;

        this.bindCanvasEvents();
        this.bindAudioUnlock();
    }

    bindCanvasEvents() {
        this.canvas.addEventListener("mousemove", (event) => {
            let position = this.getCanvasMousePosition(event);
            this.handleMouseMove(position.x, position.y);
        });
        this.canvas.addEventListener("click", (event) => {
            let position = this.getCanvasMousePosition(event);
            this.handleClick(position.x, position.y);
        });
    }

    bindAudioUnlock() {
        document.addEventListener("pointerdown", () => {
            this.world.unlockAudio();
        }, { once: true });
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

    handleMouseMove(x, y) {
        console.log("hover check", x, y);
        let buttons = [
            this.world.startButton,
            this.world.controlsButton,
            this.world.backButton,
            this.world.playButton,
            this.world.fullscreenButton,
            this.world.pauseButton,
            this.world.muteButton,
            this.world.unmuteButton
        ];
        let isHoveringAny = buttons.some(btn => btn && btn.checkHover(x, y));

        if (this.world.isGameEnded) {
            let hovering = this.world.endScreen.handleMouseMove(x, y);
            this.canvas.style.cursor = hovering ? "pointer" : "default";
            return;
        }
        if (this.world.isPaused) {
            isHoveringAny = this.world.pauseMenuScreen.handleMouseMove(x, y) || isHoveringAny;
        }
        this.canvas.style.cursor = isHoveringAny ? "pointer" : "default";
    }

    handleClick(x, y) {
        console.log("click check", x, y);
        if (this.world.isGameEnded) {
            this.world.endScreen.handleClick(x, y);
            return;
        }
        if (this.world.isPaused) {
            this.world.pauseMenuScreen.handleClick(x, y);
            return;
        }
        if (this.world.gamestate === "startScreen") {
            if (this.world.startButton.checkHover(x, y)) {
                this.world.startGame();
            }
            if (this.world.controlsButton.checkHover(x, y)) {
                this.world.gamestate = "controlsScreen";
            }
        }
        else if (this.world.gamestate === "controlsScreen") {
            if (this.world.backButton.checkHover(x, y)) {
                this.world.enterStartScreen();
            }
        }
        if (this.world.fullscreenButton.checkHover(x, y)) {
            this.toggleFullscreen();
        }
        if (this.world.muteButton.checkHover(x, y)) {
            this.toggleMute();
        }
        if (this.world.gamestate === "playingScreen" && this.world.pauseButton.checkHover(x, y)) {
            this.world.togglePause();
        }
    }

    toggleMute() {
        this.world.sounds.toggleMute();
        this.world.muteButton.icon.src = this.world.sounds.muted
            ? "./assets/img/01_UI/mute_icon.svg"
            : "./assets/img/01_UI/unmute_icon.svg";
        if (this.world.gamestate === "startScreen" && !this.world.sounds.muted) {
            this.world.sounds.playLoop(this.world.sounds.startscreenSound);
        }
    }

    toggleFullscreen() {
        let container = document.getElementById("game_container");
        if (!document.fullscreenElement) {
            container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}