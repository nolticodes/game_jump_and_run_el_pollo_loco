class Buttons {
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.isHovered = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.isHovered ? "orange" : "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(this.text, this.x + 40, this.y + 40);
    }

    checkHover(x, y) {
        this.isHovered =
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height;

        return this.isHovered;
    }

}