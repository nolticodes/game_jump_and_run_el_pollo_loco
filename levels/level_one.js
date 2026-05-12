function createLevel1() {
    return new Level(
        [
            new MiniChicken(),
            new MiniChicken(),
            new MiniChicken(),
            new MiniChicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
        ],
        [
            new Cloud("./assets/img/5_background/layers/4_clouds/1.png", 0.2),
            new Cloud("./assets/img/5_background/layers/4_clouds/2.png", 0.15)
        ],
        [
            // x = -1440
            new BackgroundObject("./assets/img/5_background/layers/air.png", -1440),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/full.png", -1440),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/full.png", -1440),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/full.png", -1440),

            // x = 0
            new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/full.png", 0),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/full.png", 0),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/full.png", 0),

            // x = 1440
            new BackgroundObject("./assets/img/5_background/layers/air.png", 1440),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/full.png", 1440),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/full.png", 1440),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/full.png", 1440),

            // x = 2880
            new BackgroundObject("./assets/img/5_background/layers/air.png", 2880),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/full.png", 2880),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/full.png", 2880),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/full.png", 2880),
        ],
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
        ],
        [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
        ]
    );
}