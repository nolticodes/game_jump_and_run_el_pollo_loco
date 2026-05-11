/**
 * Represents a clickable UI button with optional icon and hover effects.
 */
class Buttons {
    /**
     * Creates a button with position, size and label text.
     */
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.isHovered = false;
    }

    /**
     * Renders the button, delegating to icon or standard button rendering.
     */
    draw(ctx) {
        ctx.save();
        if (this.icon) {
            this.drawIcon(ctx);
        } else {
            this.drawButton(ctx);
        }
        ctx.restore();
    }

    /**
     * Renders the button as an icon with hover scaling.    
     */
    drawIcon(ctx) {
        let iconSize = this.isHovered ? this.width * 1.03 : this.width;

        ctx.drawImage(
            this.icon,
            this.x + (this.width - iconSize) / 2,
            this.y + (this.height - iconSize) / 2,
            iconSize,
            iconSize
        );
    }

    /**
     * Renders the full button including shape, border and text.
     */
    drawButton(ctx) {
        this.applyHoverTransform(ctx);
        this.drawShadow(ctx);
        this.drawFace(ctx);
        this.drawBorder(ctx);
        this.drawText(ctx);
    }

    /**
     * Applies hover-based scaling transformation around the button center.
     */
    applyHoverTransform(ctx) {
        let scale = this.isHovered ? 1.05 : 1;
        let centerX = this.x + this.width / 2;
        let centerY = this.y + this.height / 2;

        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.translate(-centerX, -centerY);
    }

    /**
     * Draws the button shadow with hover-dependent offset.
     */
    drawShadow(ctx) {
        let shadowOffset = this.isHovered ? 10 : 6;

        ctx.fillStyle = "#8B3A0E";
        this.drawRoundedRect(ctx, this.x, this.y + shadowOffset, this.width, this.height, 15);
    }

    /**
     * Draws the main button surface with hover color variation.
     */
    drawFace(ctx) {
        ctx.fillStyle = this.isHovered ? "#FFD54F" : "#F4B400";
        this.drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 15);
    }

    /**
     * Draws the button border.
     */
    drawBorder(ctx) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#8B3A0E";
        this.drawRoundedPath(ctx, this.x, this.y, this.width, this.height, 15);
        ctx.stroke();
    }

    /**
     * Renders the button text centered within the button.
     */
    drawText(ctx) {
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

    /**
     * Draws a filled rounded rectangle.
     */
    drawRoundedRect(ctx, x, y, width, height, radius, color) {
        this.drawRoundedPath(ctx, x, y, width, height, radius);
        ctx.fillStyle = color;
        ctx.fill();
    }

    /**
     * Creates a rounded rectangle path.
     */
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

    /**
     * Represents a clickable UI button with optional icon and hover effects.   
     */
    checkHover(x, y) {
        this.isHovered =
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height;

        return this.isHovered;
    }

}