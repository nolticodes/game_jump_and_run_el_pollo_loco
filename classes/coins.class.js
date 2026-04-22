class Coins extends Moveableobject{
    constructor() {
        super().loadImage("./assets/img/8_coin/coin_1.png");


        this.x = 600 + Math.random() * 1500;
        this.y = 300 - Math.random() * 300
        this.width = 150;
        this.height = 150;
    }
}