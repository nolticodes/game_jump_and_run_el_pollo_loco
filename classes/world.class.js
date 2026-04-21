class World {
    ctx;
    canvas;
    keyboard;
    character = new Pepe();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud(),
        new CloudSecond(),
    ]

    backgrounds = [
        new AirBG(),
        new ThirdLayerBG(),
        new SecondLayerBG(),
        new FirstLayerBG(),
    ]

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld()
    }

    setWorld() {
        this.character.world = this
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.backgrounds.forEach(bg => {
            this.addToMap(bg);
        });

        this.addToMap(this.character);

        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        this.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });

        let self = this
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.img.width, 0);
            this.ctx.scale(-1, 1)
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.ctx.restore();
        }
    }
}