class Gameover extends Phaser.Scene {
    constructor() {
        super('GameoverScene');
    }
    preload(){
        //load a bunch of images
        this.load.image('back','./assets/Back.png');
        this.load.image('ui','./assets/GameoverUI.png');
        this.load.image('gameover','./assets/gameover.png');
        this.load.image('restart','./assets/restart.png');
        this.load.image('menu','./assets/menu.png');
        this.load.image('stone', './assets/stone.png');
        this.load.image('ship', './assets/spaceship.png');
    }

    create() {
        highscore.push(playerscore); //add the current score to the highscore array 
        this.hs = Math.max(...highscore); //find out the highest score

        //display the content

        //background from the game
        this.background = new Canvas(this, 320, 440, 'earth').setOrigin(0.5, 0.5);
        this.add.particles('lines', [
            {
                //frame: "lines",
                x: game.config.width / 2,
                y: 190,
                angle: { min: -180, max: 180 },
                speed: speed*50000,
                gravityY: 0,
                lifespan: 5000,
                quantity: 0.01,
                scale: { min: 0.05, max: 0.2 }
            },
        ]);

        this.ship = this.add.sprite(320,240,'ship').setScale(1).setInteractive();
        
        //gameover ui
        this.ui = this.add.image(320,240,'ui').setOrigin(0.5,0.5);

        this.gameover = this.add.image(322, 120,'gameover').setScale(0.5);
        this.restart = this.add.image(432,322,'restart').setInteractive().setScale(0.38);
        this.menu = this.add.image(210,322, "menu").setInteractive().setScale(0.4);
        scoreConfig.fontSize='28px';
        this.distanceText = this.add.text(130,200,'You have traveled ' + playerscore +' Miles!', scoreConfig);
        scoreConfig.color='#D4AF37';
        this.highestscore = this.add.text(190,240,'Highest Score: ' + this.hs, scoreConfig);

        //go back to menu
        this.menu.on("pointerdown", () => {
            scoreConfig.fontSize='21px';
            scoreConfig.color='#6b97bb';
            this.sound.play('button');
            this.scene.start("menuScene");
        });
        //restart the game
        this.restart.on("pointerdown", () => {
            scoreConfig.fontSize='21px';
            scoreConfig.color='#6b97bb';
            this.sound.play('button');
            this.scene.start("playScene");
        });
    }

    update() {
        playmusic.stop(); //stop the in-game background music

    }
}