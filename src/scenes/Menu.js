class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    //load images
    preload() {
        this.load.image('play', './assets/gear.png');
        this.load.image('paper', './assets/paper.png');
    }
    
    create() {
        // create the buttons 
        this.playbutton =  this.add.text(200,200, "Play", scoreConfig);
        this.creditbutton = this.add.text(200,250, "Credit", scoreConfig);
        this.tutorialbutton = this.add.text(200,300, "Tutorial", scoreConfig)

        // make the buttons clickable
        this.playbutton.setInteractive();
        this.creditbutton.setInteractive();
        this.tutorialbutton.setInteractive();
        
        //go to play when click play
        this.playbutton.on('pointerdown', () => {
            this.scene.start('playScene');
        })

        //go to credit when click credit
        this.creditbutton.on('pointerdown', () => {
            console.log("e");
            this.scene.start('creditScene');
        })
        
        //go to tutorial when click tutorial
        this.tutorialbutton.on('pointerdown', () => {
            this.scene.start('tutorialScene');
        })
    }
}