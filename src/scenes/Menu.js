class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    //load images
    preload() {
        this.load.image('title', './assets/title3.png');
        this.load.image('lines','./assets/lines.png');
        this.load.audio('button', './assets/button.wav')
        //this.load.spritesheet('obstacles','./assets/obstacles.png','./assets/obstacles.json')
        this.load.image('play','./assets/Play.png');
        this.load.image('credits','./assets/Credits.png');
        this.load.image('tutorial','./assets/Tutorial.png');
    }
    
    create() {
        //create particles
        this.add.particles('lines', [
            {
                //frame: "lines",
                x: game.config.width / 2,
                y: game.config.height / 4,
                angle: { min: -180, max: 180 },
                speed: 100,
                gravityY: 0,
                lifespan: 5000,
                quantity: 0.01,
                scale: { min: 0.05, max: 0.2 }
            },
        ]);
        //create title
        this.title = this.add.image(game.config.width / 2, game.config.height / 4, "title");
        // create the buttons +  make the buttons clickable
        //this.playbutton =  this.add.text(200,200, "Play", scoreConfig);
        this.playbutton =  this.add.image(300,250, "play").setInteractive();
        //this.creditbutton = this.add.text(200,250, "Credit", scoreConfig);
        //this.tutorialbutton = this.add.text(200,300, "Tutorial", scoreConfig)
        this.creditbutton = this.add.image(300,300, "credits").setInteractive();
        this.tutorialbutton = this.add.image(300,350, "tutorial").setInteractive();
        
        //go to play when click play
        this.playbutton.on('pointerdown', () => {
            this.sound.play('button');
            this.scene.start('playScene');
        })

        //go to credit when click credit
        this.creditbutton.on('pointerdown', () => {
            this.sound.play('button');
            console.log("e");
            this.scene.start('creditScene');
        })
        
        //go to tutorial when click tutorial
        this.tutorialbutton.on('pointerdown', () => {
            this.sound.play('button');
            this.scene.start('tutorialScene');
        })
    }
}