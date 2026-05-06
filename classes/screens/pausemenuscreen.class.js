class PauseMenuScreen {
    resumeButton;
    restartButton;
    mainMenuButton;


    constructor(world) {
        this.world = world;

        this.menuWidth = 320;
        this.menuHeight = 400;

        this.menuX = (this.world.canvas.width - this.menuWidth) / 2;
        this.menuY = (this.world.canvas.height - this.menuHeight) / 2;

        this.buttonWidth = 200;
        this.buttonHeight = 60;

        this.buttonX = this.menuX + (this.menuWidth - this.buttonWidth) / 2;

        this.resumeButton = new Buttons(this.buttonX, this.menuY + 80, this.buttonWidth, this.buttonHeight, "Resume");
        this.restartButton = new Buttons(this.buttonX, this.menuY + 155, this.buttonWidth, this.buttonHeight, "Restart");
        this.mainMenuButton = new Buttons(this.buttonX, this.menuY + 230, this.buttonWidth, this.buttonHeight, "Main Menu");
    }

    draw() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        // Overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // Shadow
        this.drawRoundedRect(ctx, this.menuX, this.menuY + 8, this.menuWidth, this.menuHeight, 20, "#8B3A0E");
        //Box
        this.drawRoundedRect(
            ctx,
            this.menuX,
            this.menuY,
            this.menuWidth,
            this.menuHeight,
            20,              // radius
            "#FFD54F"        // deine Wunschfarbe
        );
        // Schrift
        ctx.fillStyle = "#5A2A0A";
        ctx.font = "42px 'Luckiest Guy', Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Pause", canvas.width / 2, 90);

        this.resumeButton.draw(ctx);
        this.restartButton.draw(ctx);
        this.mainMenuButton.draw(ctx)
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

    handleMouseMove(x, y) {
        let buttons = [
            this.resumeButton,
            this.restartButton,
            this.mainMenuButton
        ];

        return buttons.some(btn => btn.checkHover(x, y));
    }

    handleClick(x, y) {
        if (this.resumeButton.checkHover(x, y)) {
            this.world.togglePause();
        }

        if (this.restartButton.checkHover(x, y)) {
            this.world.restartGame();
        }

        if (this.mainMenuButton.checkHover(x, y)) {
            this.world.backToStartpage();
        }
    }

}