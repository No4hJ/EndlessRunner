class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        //load images
        this.load.image('title', './assets/title3.png');
        this.load.image('lines','./assets/lines.png');
        this.load.audio('button', './assets/button.wav');
        this.load.audio('menubgm','./assets/void_intro.wav');
        this.load.image('play','./assets/Play.png');
        this.load.image('credits','./assets/Credits.png');
        this.load.image('tutorial','./assets/Tutorial.png');
    }
    
    create() {
        //background music for menu
        menumusic = this.sound.add('menubgm', {
            volume: 0.5,
            loop: true,
        });

        //play the background music
        if (!this.sound.locked)
        {
            // already unlocked so play
            menumusic.play()
        }
        else {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                menumusic.play()
            })
        }

        //create the moving particles for the background
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
        this.playbutton =  this.add.image(300,250, "play").setInteractive();
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
            this.scene.start('creditScene');
        })
        
        //go to tutorial when click tutorial
        this.tutorialbutton.on('pointerdown', () => {
            this.sound.play('button');
            this.scene.start('tutorialScene');
        })
    }
}