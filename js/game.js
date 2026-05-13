/**
 * Entry point of the game. Sets up the world, canvas and global keyboard input.
 */
let world;
let canvas;
let keyboard = new Keyboard();

/**
 * Initializes the game by creating the world and linking it to the canvas.
 */
function init() {
    canvas = document.getElementById("canvas_id");

    world = new World(canvas, keyboard);
}

/**
 * Handles keydown events and updates keyboard state for movement and actions.
 */
window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    world.character.lastKeyPressTime = new Date().getTime();
    if (event.key == "a" || event.key == "ArrowLeft") {
        keyboard.left = true;
    }
    if (event.key == "d" || event.key == "ArrowRight") {
        keyboard.right = true;
    }
    if (event.key == "w" || event.key == "ArrowUp") {
        keyboard.up = true;
    }
    if (event.key == "s" || event.key == "ArrowDown") {
        keyboard.down = true;
    }
    if (event.key == " ") {
        keyboard.space = true;
    }
    if (event.key == "t") {
        keyboard.t = true;
    }
});

/**
 * Handles keyup events and resets keyboard state when keys are released.
 */
window.addEventListener("keyup", (event) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
        keyboard.left = false;
    }
    if (event.key == "d" || event.key == "ArrowRight") {
        keyboard.right = false;
    }
    if (event.key == "w" || event.key == "ArrowUp") {
        keyboard.up = false;
    }
    if (event.key == "s" || event.key == "ArrowDown") {
        keyboard.down = false;
    }
    if (event.key == " ") {
        keyboard.space = false;
    }
    if (event.key == "t") {
        keyboard.t = false;
    }
});