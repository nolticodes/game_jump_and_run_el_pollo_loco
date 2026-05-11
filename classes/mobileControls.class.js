class MobileControls {
    constructor(world) {
        this.world = world;
        this.bindControls();
    }

    bindControls() {
        this.bindButton("btn_left", "left");
        this.bindButton("btn_right", "right");
        this.bindButton("btn_jump", "up");
        this.bindButton("btn_throw", "t");
    }

    bindButton(buttonId, keyName) {
        let button = document.getElementById(buttonId);

        if (!button) return;
        button.addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.world.keyboard[keyName] = true;
        });
        button.addEventListener("touchend", (event) => {
            event.preventDefault();
            this.world.keyboard[keyName] = false;
        });
        button.addEventListener("mousedown", () => {
            this.world.keyboard[keyName] = true;
        });
        button.addEventListener("mouseup", () => {
            this.world.keyboard[keyName] = false;
        });
        button.addEventListener("mouseleave", () => {
            this.world.keyboard[keyName] = false;
        });
    }

    updateVisibility() {
        if (this.world.gamestate === "playingScreen" && !this.world.isPaused && !this.world.isGameEnded) {
            document.body.classList.add("show_mobile_controls");
        } else {
            document.body.classList.remove("show_mobile_controls");
        }
    }
}