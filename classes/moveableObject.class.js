class Moveableobject {
    x = 80;
    y = 40;
    img;
    width = 200;
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