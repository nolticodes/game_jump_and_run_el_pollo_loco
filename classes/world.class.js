class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    character = new Pepe();
    level = level1

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld()
        this.checkCollision();
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hit(enemy)
                    console.log("Collision with", this.character.energy)
                }
            }); 
        }, 200);
        setInterval(() => {
            this.level.coins.forEach((coins) => {
                if(this.character.isColliding(coins)) {
                    console.log("Collision detectes", coins)
                }
            }); 
        }, 200);
        setInterval(() => {
            this.level.bottles.forEach((bottles) => {
                if(this.character.isColliding(bottles)) {
                    console.log("Collision detectes", bottles)
                }
            }); 
        }, 200);
    }

    setWorld() {
        this.character.world = this;
        this.character.animateImages();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.level.backgrounds.forEach(bg => {
            this.addToMap(bg);
        });

        this.addToMap(this.character);

        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        this.level.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });

        this.level.coins.forEach(coin => {
            this.addToMap(coin)
        })

        this.level.bottles.forEach(bottle => {
            this.addToMap(bottle)
        })

        this.ctx.translate(-this.camera_x, 0)

        let self = this
        requestAnimationFrame(function () {
            self.draw();
        });


    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImages(mo);
        }

        mo.drawMoveableObjects(this.ctx);
        mo.drawRectangle(this.ctx);

        if (mo.otherDirection) {
            this.flipImagesBack(mo);
        }
    }

    flipImages(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImagesBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}