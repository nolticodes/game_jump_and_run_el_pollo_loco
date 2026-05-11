class GameLogic {
    constructor(world) {
        this.world = world;
        this.start();
    }

    start() {
        this.handleThrowing();
        this.handleCollisions();
        this.handleCollectibles();
    }

    handleThrowing() {
        setInterval(() => {
            if (this.world.isPaused) return;
            this.throwBottle();
            this.cleanupBottles();
        }, 200);
    }

    throwBottle() {
        if (this.world.keyboard.t && this.world.collectedBottles > 0) {
            this.world.sounds.play(this.world.sounds.throwingBottleSound);
            let xOffset = this.world.character.otherDirection ? 20 : 100;
            let yOffset = 160;
            let bottle = new ThrowableObject(
                this.world.character.x + xOffset,
                this.world.character.y + yOffset,
                this.world.character.otherDirection
            );
            bottle.world = this.world;
            bottle.throw();
            this.world.throwableObject.push(bottle);
            this.world.collectedBottles--;
            let percentage = (this.world.collectedBottles / this.world.maxBottles) * 100;
            this.world.statusbarBottles.setPercentage(percentage);
            this.world.keyboard.t = false;
        }
    }

    cleanupBottles() {
        this.world.throwableObject =
            this.world.throwableObject.filter(b => !b.markedForDeletion);
    }

    handleCollisions() {
        setInterval(() => {
            if (this.world.isPaused) return;
            this.handleEnemyCollision();
            this.handleBottleHits();
        }, 200);
    }

    handleEnemyCollision() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (enemy instanceof Chicken && this.world.character.isJumpingOn(enemy)) {
                this.world.sounds.play(this.world.sounds.chickenDies);
                this.world.level.enemies.splice(index, 1);
                this.world.character.speedY = 13;
            } 
            else if (enemy instanceof MiniChicken && this.world.character.isJumpingOn(enemy)) {
                this.world.sounds.play(this.world.sounds.chickenDies);
                this.world.level.enemies.splice(index, 1);
                this.world.character.speedY = 8;
            } 
            else if (this.world.character.isColliding(enemy) && !this.world.character.isHurt()) {
                this.world.sounds.play(this.world.sounds.pepeHurt);
                this.world.character.hit(enemy);
                this.world.statusbarHealth.setPercentage(this.world.character.energy);
            }
        });
    }

    handleBottleHits() {
        this.world.throwableObject.forEach((bottle) => {
            this.world.level.enemies.forEach((enemy, enemyIndex) => {
                if (!bottle.isBroken && bottle.isColliding(enemy)) {
                    this.world.sounds.play(this.world.sounds.splashBottle);
                    if (enemy instanceof Endboss) {
                        enemy.hit(bottle);
                        if (enemy.energy < 0) {
                            enemy.energy = 0;
                        }
                        this.world.sounds.play(this.world.sounds.endbossHit);
                        this.world.statusbarEndboss.setPercentage(enemy.energy);
                        bottle.playSplashAnimation();
                    } else {
                        this.world.sounds.play(this.world.sounds.chickenDies);
                        this.world.level.enemies.splice(enemyIndex, 1);
                        bottle.playSplashAnimation();
                    }
                }
            });
        });
    }

    handleCollectibles() {
        setInterval(() => {
            if (this.world.isPaused) return;
            this.collectCoins();
            this.collectBottles();
        }, 200);
    }

    collectCoins() {
        for (let i = this.world.level.coins.length - 1; i >= 0; i--) {
            let coin = this.world.level.coins[i];
            if (this.world.character.isColliding(coin)) {
                let collected = this.world.maxCoins - this.world.level.coins.length;
                let percentage = (collected / this.world.maxCoins) * 100;
                this.world.sounds.play(this.world.sounds.collectCoin);
                this.world.level.coins.splice(i, 1);
                this.world.statusbarCoins.setPercentage(percentage);
            }
        }
    }

    collectBottles() {
        for (let i = this.world.level.bottles.length - 1; i >= 0; i--) {
            let bottle = this.world.level.bottles[i];
            if (this.world.character.isColliding(bottle)) {
                this.world.sounds.play(this.world.sounds.collectBottle);
                this.world.level.bottles.splice(i, 1);
                this.world.collectedBottles++;
                let percentage = (this.world.collectedBottles / this.world.maxBottles) * 100;
                this.world.statusbarBottles.setPercentage(percentage);
            }
        }
    }
}