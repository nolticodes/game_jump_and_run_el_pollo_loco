class PauseMenuScreen {
    resumeButton;
    restartButton;
    mainMenuButton;


    constructor(world) {
        this.world = world;

        this.menuWidth = 320;
        this.menuHeight = 300;

        this.menuX = (this.world.canvas.width - this.menuWidth) / 2;
        this.menuY = (this.world.canvas.height - this.menuHeight) / 2;

        this.buttonWidth = 150;
        this.buttonHeight = 60;

        this.buttonX = this.menuX + (this.menuWidth - this.buttonWidth) / 2;

        this.resumeButton = new Buttons(this.buttonX, this.menuY + 80, this.buttonWidth, this.buttonHeight, "Resume");
        this.restartButton = new Buttons(this.buttonX, this.menuY + 145, this.buttonWidth, this.buttonHeight, "Restart");
        this.mainMenuButton = new Buttons(this.buttonX, this.menuY + 210, this.buttonWidth, this.buttonHeight, "Main Menu");
    }

    draw() {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;

        // Overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Box
        ctx.fillStyle = "#8B3A0E"; // Box
        ctx.fillRect(this.menuX, this.menuY, this.menuWidth, this.menuHeight);
        ctx.fillStyle = "black"; // Schrift
        ctx.font = "42px 'Luckiest Guy', Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Pause", canvas.width / 2, 70);

        this.resumeButton.draw(ctx);
        this.restartButton.draw(ctx);
        this.mainMenuButton.draw(ctx)
    }

}