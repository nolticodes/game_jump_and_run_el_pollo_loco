let world;
let canvas;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("cancas_id");
    world = new World(canvas, keyboard);
}


window.addEventListener("keydown", (event) => {
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