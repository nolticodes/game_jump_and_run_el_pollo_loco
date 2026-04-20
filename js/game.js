let canvas;
let ctx;
let character = new Moveableobject();

function init() {
    canvas = document.getElementById("cancas_id");
    ctx = canvas.getContext("2d");
    console.log("My Characater is", character)
} 
