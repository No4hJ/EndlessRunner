class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }
    preload(){
        this.load.image('back','./assets/Back.png');
    }
    create() {
        //display the content
        this.tutorial = this.add.text(200,200,"tutorial!", scoreConfig);

        //go back to menu
        this.back = this.add.image(200,400, "back").setInteractive();

        this.back.on("pointerdown", () => {
            this.sound.play('button');
            this.scene.start("menuScene");
        })
    }
}