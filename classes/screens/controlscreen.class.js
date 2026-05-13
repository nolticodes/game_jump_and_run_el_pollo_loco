/**
 * Represents the controls screen displaying input instructions.
 */
class ControlsScreen {

    /**
     * Initializes the controls screen with a reference to the world.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Renders the complete controls screen.
     */
    draw() {
        this.drawBackground();
        this.drawOverlay();
        this.drawTitle();
        this.drawControls();
        this.drawBackButton();
    }

    /**
     * Draws the background image.
     */
    drawBackground() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        ctx.drawImage(this.world.startScreenImage, 0, 0, canvas.width, canvas.height);
    }

    /**
     * Draws the dark overlay.
     */
    drawOverlay() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Renders the screen title.
     */
    drawTitle() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        ctx.fillStyle = "white";
        ctx.font = "42px 'Luckiest Guy', Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("CONTROLS", canvas.width / 2, 70);
    }

    /**
     * Renders all control instruction lines.
     */
    drawControls() {
        this.drawControlLine("Jump", "W / Space / Arrow Up", 170);
        this.drawControlLine("Left", "A / Arrow Left", 220);
        this.drawControlLine("Right", "D / Arrow Right", 270);
        this.drawControlLine("Throw Bottle", "T", 370);
    }

    /**
     * Draws a single control instruction line.
     */
    drawControlLine(action, key, y) {
        let ctx = this.world.ctx;

        ctx.font = "26px 'Luckiest Guy', Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "#FFD54F";
        ctx.fillText(action, 170, y);
        ctx.fillStyle = "white";
        ctx.fillText(key, 390, y);
    }

    /**
     * Draws the back button.
     */
    drawBackButton() {
        this.world.backButton.draw(this.world.ctx);
    }
}