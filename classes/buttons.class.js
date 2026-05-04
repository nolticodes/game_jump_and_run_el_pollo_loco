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
        let radius = 15;

        let scale = this.isHovered ? 1.08 : 1;
        let shadowOffset = this.isHovered ? 10 : 6;

        ctx.save();

        // 👉 Scale Animation (zentriert)
        let centerX = this.x + this.width / 2;
        let centerY = this.y + this.height / 2;

        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.translate(-centerX, -centerY);

        // 👉 Shadow (3D Effekt)
        ctx.fillStyle = "#8B3A0E";
        this.drawRoundedRect(ctx, this.x, this.y + shadowOffset, this.width, this.height, radius);

        // 👉 Button Farbe
        ctx.fillStyle = this.isHovered ? "#FFD54F" : "#F4B400";
        this.drawRoundedRect(ctx, this.x, this.y, this.width, this.height, radius);

        // 👉 Border
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#8B3A0E";
        this.drawRoundedPath(ctx, this.x, this.y, this.width, this.height, radius);
        ctx.stroke();

        // 👉 Text oder Icon
        if (this.icon) {
            let iconSize = this.width * 0.6;

            ctx.drawImage(
                this.icon,
                this.x + (this.width - iconSize) / 2,
                this.y + (this.height - iconSize) / 2,
                iconSize,
                iconSize
            );
        } else {
            ctx.fillStyle = "white";
            ctx.font = "30px 'Luckiest Guy', Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                this.text,
                this.x + this.width / 2,
                this.y + this.height / 2 + 5
            );
        }

        ctx.restore();
    }

    drawRoundedRect(ctx, x, y, width, height, radius, color) {
        this.drawRoundedPath(ctx, x, y, width, height, radius);
        ctx.fillStyle = color;
        ctx.fill();
    }

    drawRoundedPath(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
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