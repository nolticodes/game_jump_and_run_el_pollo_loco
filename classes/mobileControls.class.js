/**
 * Manages mobile control inputs and their visibility.
 */
class MobileControls {
    /**
     * Initializes mobile controls and binds all control buttons.
     */
    constructor(world) {
        this.world = world;
        this.bindControls();
    }

    /**
     * Binds all mobile control buttons to their respective actions.
     */
    bindControls() {
        this.bindButton("btn_left", "left");
        this.bindButton("btn_right", "right");
        this.bindButton("btn_jump", "up");
        this.bindButton("btn_throw", "t");
    }

    /**
     * Binds a single button to a keyboard action for touch and mouse input.
     */
    bindButton(buttonId, keyName) {
        let button = document.getElementById(buttonId);

        if (!button) return;
        button.addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.world.keyboard[keyName] = true;
            this.world.character.lastKeyPressTime = new Date().getTime();
        });
        button.addEventListener("touchend", (event) => {
            event.preventDefault();
            this.world.keyboard[keyName] = false;
            this.world.character.lastKeyPressTime = new Date().getTime();
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

    /**
     * Updates the visibility of mobile controls based on game state.
     */
    updateVisibility() {
        if (this.world.gamestate === "playingScreen" && !this.world.isPaused && !this.world.isGameEnded) {
            document.body.classList.add("show_mobile_controls");
        } else {
            document.body.classList.remove("show_mobile_controls");
        }
    }
}