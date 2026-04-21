let world;
let canvas;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("cancas_id");
    world = new World(canvas, keyboard);


    console.log("My Characater is", world.character)
}


window.addEventListener("keydown", (event) => {
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
});