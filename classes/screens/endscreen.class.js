/**
 * Represents the endscreen shown after the game ends.
 */
class Endscreen {
    restartButton;
    mainMenuButton;

    /**
     * Initializes layout and buttons for the endscreen.
     */
    constructor(world) {
        this.world = world;
        this.initLayout();
        this.initButtons();
    }

    /**
     * Initializes layout dimensions and positions.
     */
    initLayout() {
        this.menuWidth = 320;
        this.menuHeight = 400;
        this.menuX = (this.world.canvas.width - this.menuWidth) / 2;
        this.menuY = (this.world.canvas.height - this.menuHeight) / 2;
        this.buttonWidth = 200;
        this.buttonHeight = 60;
        this.buttonX = this.menuX + (this.menuWidth - this.buttonWidth) / 2;
    }

    /**
     * Creates all endscreen buttons.
     */
    initButtons() {
        this.restartButton = new Buttons(this.buttonX, this.menuY + 155, this.buttonWidth, this.buttonHeight, "Restart");
        this.mainMenuButton = new Buttons(this.buttonX, this.menuY + 230, this.buttonWidth, this.buttonHeight, "Main Menu");
    }

    /**
     * Renders the complete endscreen.
     */
    drawEndscreen() {
        this.drawOverlay();
        this.drawMenuBox();
        this.drawTitle();
        this.drawButtons();
    }

    /**
     * Draws the dark overlay background.
     */
    drawOverlay() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Draws the menu box including shadow and background.
     */
    drawMenuBox() {
        let ctx = this.world.ctx;

        this.drawRoundedRect(ctx, this.menuX, this.menuY + 8, this.menuWidth, this.menuHeight, 20, "#8B3A0E");
        this.drawRoundedRect(ctx, this.menuX, this.menuY, this.menuWidth, this.menuHeight, 20, "#FFD54F");
    }

    /**
     * Renders the result title (win or lose).
     */
    drawTitle() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        ctx.fillStyle = "#5A2A0A";
        ctx.font = "42px 'Luckiest Guy', Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.getTitleText(), canvas.width / 2, 90);
    }

    /**
     * Returns the correct title text based on game outcome.
     */
    getTitleText() {
        if (this.world.character.isDead()) {
            return "You Lost";
        }
        if (this.isEndbossDead()) {
            return "You Won";
        }
        return "";
    }

    /**
     * Checks if the endboss is defeated.
     */
    isEndbossDead() {
        let endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        return endboss?.isDead();
    }

    /**
     * Draws all endscreen buttons.
     */
    drawButtons() {
        let ctx = this.world.ctx;

        this.restartButton.draw(ctx);
        this.mainMenuButton.draw(ctx);
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
     * Handles hover detection for endscreen buttons.
     */
    handleMouseMove(x, y) {
        return this.getButtons().some(btn => btn.checkHover(x, y));
    }

    /**
     * Handles click actions for endscreen buttons.
     */
    handleClick(x, y) {
        if (this.restartButton.checkHover(x, y)) {
            this.world.restartGame();
        }
        if (this.mainMenuButton.checkHover(x, y)) {
            this.world.backToStartpage();
        }
    }

    /**
     * Returns all interactive buttons on the endscreen.
     */
    getButtons() {
        return [
            this.restartButton,
            this.mainMenuButton
        ];
    }
}