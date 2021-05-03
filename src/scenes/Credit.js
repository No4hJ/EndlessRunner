class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }
    preload(){
        //load images
        this.load.image('cs','./assets/creditscene.png');
        this.load.image('back','./assets/Back.png');
    }

    create() {
        //display the content
        this.creditsence = this.add.image(320,215, 'cs').setOrigin(0.5,0.5); //credit page
        this.creditsence.setScale(1.15);

        //go back to menu
        this.back = this.add.image(130,450, 'back').setInteractive(); //back button
        this.back.setScale(0.8)
        //if clicked
        this.back.on('pointerdown', () => {
            this.sound.play('button');
            menumusic.stop();
            this.scene.start('menuScene');
        })
    }
}