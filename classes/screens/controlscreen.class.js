class ControlsScreen {
    constructor(world) {
        this.world = world;
    }

    draw() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        ctx.drawImage(this.world.startScreenImage, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "42px 'Luckiest Guy', Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("CONTROLS", canvas.width / 2, 70);

        this.drawControlLine("Jump", "W / Space / Arrow Up", 170);
        this.drawControlLine("Left", "A / Arrow Left", 220);
        this.drawControlLine("Right", "D / Arrow Right", 270);
        this.drawControlLine("Down", "S / Arrow Down", 320);
        this.drawControlLine("Throw Bottle", "T", 370);

        this.world.backButton.draw(ctx);
    }

    drawControlLine(action, key, y) {
        let ctx = this.world.ctx;

        ctx.font = "26px 'Luckiest Guy', Arial";
        ctx.textAlign = "left";

        ctx.fillStyle = "#FFD54F";
        ctx.fillText(action, 170, y);

        ctx.fillStyle = "white";
        ctx.fillText(key, 390, y);
    }
}