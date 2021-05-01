class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }
    preload(){
        this.load.image('cs','./assets/creditscene.png');
        this.load.image('back','./assets/Back.png');
    }

    create() {
        //display the content
        //this.credit = this.add.text(200,200, "credits!", scoreConfig);
        this.creditsence = this.add.image(320,200, "cs").setOrigin(0.5,0.5);

        //go back to menu
        this.back = this.add.image(200,420, "back");
            
        this.back.setInteractive();
        
        this.back.on("pointerdown", () => {
            this.sound.play('button');
            this.scene.start("menuScene");
        })
    }
}