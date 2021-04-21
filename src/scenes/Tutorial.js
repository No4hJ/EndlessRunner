class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    create() {
        this.tutorial = this.add.text(200,200,"tutorial!", scoreConfig);

        //go back to menu
        this.back = this.add.text(200,400, "back", scoreConfig);
        this.back.setInteractive();

        this.back.on("pointerdown", () => {
            this.scene.start("menuScene");
        })
    }
}