class Coins extends Moveableobject {

    offset = {
        top: 0,
        bottom: 30,
        left: 0,
        right: 0,
    }

    constructor() {
        super();
        this.loadImage("./assets/img/8_coin/coin_1.png");

        this.x = 600 + Math.random() * 1500;

        this.baseY = 300 - Math.random() * 300; // Ausgangspunkt
        this.y = this.baseY;

        this.width = 150;
        this.height = 150;

        this.angle = 0; // für Sinus-Bewegung

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.angle += 0.04; // Geschwindigkeit der Bewegung
            this.y = this.baseY + Math.sin(this.angle) * 25; // Radius = 50px
        }, 1000 / 60);
    }
}