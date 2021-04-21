class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        this.credit = this.add.text(200,200, "credits!", scoreConfig);

        //go back to menu
        this.back = this.add.text(200,400, "back", scoreConfig);
        this.back.setInteractive();

        this.back.on("pointerdown", () => {
            this.scene.start("menuScene");
        })
    }
}