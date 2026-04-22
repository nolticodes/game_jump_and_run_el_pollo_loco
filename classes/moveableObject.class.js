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
    speedY = 0;
    acceleration = 2.2

    applyGravity() {
        setInterval(() => {
            if (this.isInAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 40) {
                this.y = 40;
                this.speedY = 0
            }
        }, 1000 / 25)
    }

    isInAir() {
        return this.y < 40
    }

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
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    };

    jump() {
        return this.speedY = 25
    };
}