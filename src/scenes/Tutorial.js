class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }
    preload(){
        //load images
        this.load.image('tutorialscene', './assets/tutorial_scene.png');
        this.load.image('back','./assets/Back.png');
    }
    create() {
        //display the content
        this.tutorialscene = this.add.image(320, 225, "tutorialscene").setScale(0.95); //tutorial content

        //go back to menu
        this.back = this.add.image(130,450, "back").setInteractive(); //back button
        this.back.setScale(0.8)

        //if press back
        this.back.on("pointerdown", () => {
            this.sound.play('button');
            menumusic.stop();
            this.scene.start("menuScene");
        })
    }
}