let world;
let canvas;

function init() {
    canvas = document.getElementById("cancas_id");
    world = new World(canvas);
    
    
    console.log("My Characater is", world.character)
} 
