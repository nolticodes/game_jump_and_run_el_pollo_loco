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
            new AirBG_0(),
            new ThirdLayerBG_0(),
            new SecondLayerBG_0(),
            new FirstLayerBG_0(),
            new AirBG(),
            new ThirdLayerBG(),
            new SecondLayerBG(),
            new FirstLayerBG(),
            new AirBG_2(),
            new ThirdLayerBG_2(),
            new SecondLayerBG_2(),
            new FirstLayerBG_2(),
            new AirBG_3(),
            new ThirdLayerBG_3(),
            new SecondLayerBG_3(),
            new FirstLayerBG_3(),
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