class Moveableobject {
    x = 80;
    y = 40;
    img;
    width = 200;
    height = 400;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;


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

    animationMoveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        console.log("moving right")
    }

    moveLeft() {

    };
}