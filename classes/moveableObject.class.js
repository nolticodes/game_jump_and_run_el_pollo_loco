class Moveableobject {
    x = 120;
    y = 100;
    img;
    width = 125;
    height = 400;
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log("moving right")
    }

    moveLeft() {

    };
}