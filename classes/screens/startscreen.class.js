class StartScreen {
    constructor(world) {
        this.world = world;
    }

    draw() {
        this.world.ctx.drawImage(
            this.world.startScreenImage,
            0,
            0,
            this.world.canvas.width,
            this.world.canvas.height
        );

        this.world.startButton.draw(this.world.ctx);
        this.world.controlsButton.draw(this.world.ctx);
        this.world.fullscreenButton.draw(this.world.ctx, this.world.fullscreenImage);
        this.world.muteButton.draw(this.world.ctx)
    }
}