class Moveableobject {
    x = 80;
    y = 40;
    img;
    width = 200;
    height = 400;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImagesToCacheJSON(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img
        });
    }


    moveRight() {
        console.log("moving right")
    }

    moveLeft() {

    };
}