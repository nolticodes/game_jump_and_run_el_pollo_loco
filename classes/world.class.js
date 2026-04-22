class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
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
        new AirBG_2(),
        new ThirdLayerBG_2(),
        new SecondLayerBG_2(),
        new FirstLayerBG_2(),
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

        this.ctx.translate(this.camera_x, 0)

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

        this.ctx.translate(-this.camera_x, 0)

        let self = this
        requestAnimationFrame(function () {
            self.draw();
        });

        
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            // Change dircetion of image pepe
            // Wieso werden nicht die anderen ctx Elemente verschoben??
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            mo.x = mo.x * -1
            this.ctx.restore();
        }
    }
}