class Gameover extends Phaser.Scene {
    constructor() {
        super('GameoverScene');
    }
    preload(){
        this.load.image('back','./assets/Back.png');
        this.load.image('ui','./assets/GameoverUI.png');
        this.load.image('gameover','./assets/gameover.png');
        this.load.image('restart','./assets/restart.png');
        this.load.image('menu','./assets/menu.png');
        this.load.image('stone', './assets/stone.png');
        this.load.image('ship', './assets/spaceship.png');
    }

    create() {
        highscore.push(playerscore);
        this.hs = Math.max(...highscore);

        //display the content
        this.background = new Canvas(this, 320, 440, 'earth').setOrigin(0.5, 0.5);
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

        this.ship = this.add.sprite(320,240,'ship').setScale(1).setInteractive();
        
        this.ui = this.add.image(320,240,'ui').setOrigin(0.5,0.5);

        this.gameover = this.add.image(322, 120,'gameover').setScale(0.5);
        this.restart = this.add.image(432,322,'restart').setInteractive().setScale(0.38);
        this.menu = this.add.image(210,322, "menu").setInteractive().setScale(0.4);
        scoreConfig.fontSize='28px';
        //this.gameOvertext = this.add.text(200, 120, 'GAME OVER',scoreConfig).setOrigin(0.0);
        //this.gameOvertext.setVisible(false);
        //this.distanceText = this.add.text(50,250,'You have traveled ' + this.playerscore +' Miles', scoreConfig);
        this.distanceText = this.add.text(130,200,'You have traveled ' + playerscore +' Miles!', scoreConfig);
        scoreConfig.color='#D4AF37';
        this.highestscore = this.add.text(190,240,'Highest Score: ' + this.hs,scoreConfig);
        //this.highestscore.setVisible(false);

        //go back to menu
        this.menu.on("pointerdown", () => {
            scoreConfig.fontSize='21px';
            scoreConfig.color='#6b97bb';
            this.sound.play('button');
            this.scene.start("menuScene");
        })
        this.restart.on("pointerdown", () => {
            scoreConfig.fontSize='21px';
            scoreConfig.color='#6b97bb';
            this.sound.play('button');
            this.scene.start("playScene");
        })
    }
    update(){

    }
}