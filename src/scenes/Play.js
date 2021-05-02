class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    //load images & sounds
    preload() {
        this.load.audio('playbgm', './assets/void_ingame.wav');
        this.load.image('earth', './assets/earth_.png');
        this.load.image('stone', './assets/stone.png');
        this.load.image('ship', './assets/spaceship.png');
        this.load.image('left', './assets/left.png');
        this.load.image('right', './assets/right.png');
        this.load.image('shipred', './assets/spaceshipdamaged.png');
        this.load.spritesheet('obstacles','./assets/obstacles.png',{
            frameWidth: 96,
            frameHeight: 64,
            startFrame: 0,
            endFrame:2
        });
        this.load.image('mileui','./assets/MilesUI.png');
        this.load.spritesheet('leftgif','./assets/leftgif.png',{
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame:3
        });
        this.load.spritesheet('rightgif','./assets/rightgif.png',{
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame:3
        });
        this.load.spritesheet('spaceship_red','./assets/spaceship_red.png',{
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame:6
        });
    }

    create() {      
        menumusic.stop();
        //create music and config  
        playmusic = this.sound.add('playbgm', {
            volume: 0.1,
            loop: true,
        });

        //condition of game ending
        lane = 2; //intialize lane
        this.gameOver = false; //game end or not
        this.hp = 5; //initialize health
        this.isSpawn = true; //spawn obstacle or not

        this.anims.create({
            key:'rightgif',
            frames: this.anims.generateFrameNumbers('rightgif',{
                start: 0,
                end:3,
                first: 0
            }),
            frameRate: 8
        });

        this.anims.create({
            key:'spaceship_red',
            frames: this.anims.generateFrameNumbers('spaceship_red',{
                start: 0,
                end:6,
            }),
            frameRate: 8
        });

        this.anims.create({
            key:'leftgif',
            frames: this.anims.generateFrameNumbers('leftgif',{
                start: 0,
                end:3,
                first: 0
            }),
            frameRate: 8
        });

        this.distanceText;
        this.distance = 0;
        this.distanceTimer;
        //test objects
        this.background = new Canvas(this, 320, 440, 'earth').setOrigin(0.5, 0.5); //background
        //particle
        this.add.particles('lines', [
            {
                //frame: "lines",
                x: game.config.width / 2,
                y: 190,
                angle: { min: -180, max: 180 },
                speed: 500,
                gravityY: 0,
                lifespan: 5000,
                quantity: 0.01,
                scale: { min: 0.05, max: 0.2 }
            },
        ]);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //spawn obstacles
        //this.spawntimer = this.time.addEvent({
        //   delay: 5000,                // ms
        //   callback: () => {
        //       xCo = Math.floor(Math.random() * game.config.width);
        //       xCo1 = Math.floor(Math.random() * game.config.width);
        //        xCo2 = Math.floor(Math.random() * game.config.width);
                //appear = Math.floor(Math.random() * 2);
                //obsFrame = Math.floor(Math.random()*3);
                //console.log(xCo, xCo1,xCo2);
        //    },
        //    callbackScope: null,
        //    loop: true
        //});
        
        this.obstacle = new Obstacle(this, xCo, 100, 'obstacles', 0, 1).setScale(1); //obstacle
        this.mid = new Obstaclemid(this, xCo1, 100, 'obstacles', 1, 2).setScale(1); //obstacle
        this.big = new Obstaclebig(this, xCo2, 100, 'obstacles', 2, 3).setScale(1); //obstacle
        this.obstacle.alpha = 0;
        this.mid.alpha = 0;
        this.big.alpha = 0;

        //console.log(this.obstacle.getBounds());
        //console.log(this.ship.getBounds()); 
        //timer or travel how long

        //this.left = this.add.sprite(320,240,'left').setScale(1).setInteractive();
        //this.right = this.add.sprite(320,240,'right').setScale(1).setInteractive();
        this.ship = this.add.sprite(320,240,'ship').setScale(1).setInteractive();
        //this.left.setVisible(false);
        //this.right.setVisible(false);

        //this.shipred = this.add.sprite(320,240,'shipred').setScale(1).setInteractive();
        //this.shipred.setVisible(false);
        
        this.playright = this.add.sprite(0, 0, 'rightgif').setOrigin(0, 0);
        this.playleft = this.add.sprite(0, 0, 'leftgif').setOrigin(0, 0);
        this.spaceship_red = this.add.sprite(0, 0, 'spaceship_red').setOrigin(0, 0);

        this.distanceText = this.add.text(64,38, this.distance +' miles.', scoreConfig);
        this.mileui = this.add.image(125,50, "mileui").setScale(1.1);
        //Gameover text
        //this.gameOvertext= this.add.text(220, 240, 'GAME OVER',scoreConfig).setOrigin(0.0);
        //this.gameOvertext.setVisible(false);

        //play the bgm
        if (!this.sound.locked)
        {
            // already unlocked so play
            playmusic.play()
        }
        else {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                playmusic.play()
            })
        }
    }


    update() {
        //console.log(new Date().getSeconds(), new Date().getMilliseconds());

        //this.shipred.setVisible(false);
        if(Math.floor(this.obstacle.scaleX) == 5) {
            startCheck = true;
        }

        if(startCheck) {
            //console.log(this.checkCollision(this.ship,this.obstacle));
            if (this.checkCollision(this.ship,this.obstacle)) {
                startCheck = false;
                //this.ship.setTint(0xff0000);
                this.obstacle.reset();
                this.hp -= 1;
                //this.shipred.setVisible(true);
                this.damamgedship();
                console.log("hit!");
                console.log(this.hp);
                this.randomnum();
                //this.distance += 1;
                //this.score.text = this.distance;

            } else {
                startCheck = false;
                this.obstacle.reset();
                console.log("miss!");
                this.randomnum();
                //this.distance += 1;
                //this.score.text = this.distance;
            }
        }

        if(Math.floor(this.mid.scaleX) == 5) {
            startCheckMid = true;
        }

        if(startCheckMid) {
            //console.log(this.checkCollision(this.ship,this.mid));
            if (this.checkCollision(this.ship,this.mid)) {
                startCheckMid = false;
                //this.ship.setTint(0xff0000);
                this.mid.reset();
                this.hp -= 2;
                this.damamgedship();
                //this.shipred.setVisible(true);
                console.log("hit! #mid");
                console.log(this.hp);
                this.randomnum();
                //this.distance += 1;
                //this.score.text = this.distance;

            } else {
                startCheck = false;
                this.mid.reset();
                console.log("miss! #mid");
                this.randomnum();
                //this.distance += 1;
                //this.score.text = this.distance;
            }
        }

        if(Math.floor(this.big.scaleX) == 5) {
            startCheckbig = true;
        }

        if(startCheckbig) {
            //console.log(this.checkCollision(this.ship,this.big));
            if (this.checkCollision(this.ship,this.big)) {
                startCheckbig = false;
                //this.ship.setTint(0xff0000);
                this.big.reset();
                this.hp -= 1;
                this.damamgedship();
                //this.shipred.setVisible(true);
                console.log("hit! #big");
                console.log(this.hp);
                this.randomnum();
                //this.distance += 1;
                //this.score.text = this.distance;

            } else {
                startCheckbig = false;
                this.big.reset();
                console.log("miss! #big");
                this.randomnum();
                //this.distance += 1;
                //this.score.text = this.distance;
            }
        }

        this.background.update(); 
        
        if(appear==0){
            this.obstacle.update();
            this.obstacle.alpha = 1;

        
        }else if(appear == 1)
            {this.mid.update();
            this.mid.alpha = 1;
        
        }else{this.big.update();
            this.big.alpha = 1;
        }

        this.distanceTimer = setInterval(this.distanceCheck(),1000);
        
        if(this.hp <= 0) { //gameover condition
            this.gameOver = true;
        }

        if(this.gameOver) {
            //this.gameOvertext.setVisible(false);
            playmusic.stop();
            playerscore = this.distance;
            this.scene.start('GameoverScene');
        }
        
        if(isLeft){
            this.ship.alpha = 0;
            this.playleft.alpha = 1;  
            //let playleft = this.add.sprite(0, 0, 'leftgif').setOrigin(0, 0);
            this.playleft.anims.play('leftgif');
            this.playleft.on('animationcomplete', () => {    // callback after anim completes
                this.ship.alpha = 1;                      // make ship visible again
                this.playleft.alpha = 0;                       // remove explosion sprite
              });
        }
        if(isRight){
            this.ship.alpha = 0;
            this.playright.alpha = 1;
            //let playright = this.add.sprite(0, 0, 'rightgif').setOrigin(0, 0);
            this.playright.anims.play('rightgif');
            this.playright.on('animationcomplete', () => {    // callback after anim completes
                this.ship.alpha = 1;                      // make ship visible again
                this.playright.alpha = 0;                       // remove explosion sprite
              });
        }

        
    }
    
    //check collision source from https://phaser.io/examples/v2/sprites/overlap-without-physics
    //and https://phaser.io/examples/v3/view/geom/intersects/rectangle-to-rectangle
    checkCollision(ship,obstacles){
        return Phaser.Geom.Intersects.RectangleToRectangle(obstacles.getBounds(), ship.getBounds());
    }

    distanceCheck(){
        this.distance +=1;
        this.distanceText=this.add.text(64,38,this.distance +' Miles', scoreConfig);
    }
    //setTint(){
    //    this.ship.setTint(0xff0000);
    //}
    damamgedship(){
        this.ship.alpha = 0;
        this.spaceship_red.alpha = 1;
        //let playright = this.add.sprite(0, 0, 'rightgif').setOrigin(0, 0);
        this.spaceship_red.anims.play('spaceship_red');
        this.spaceship_red.on('animationcomplete', () => {    // callback after anim completes
            this.ship.alpha = 1;                      // make ship visible again
            this.spaceship_red.alpha = 0;                       // remove explosion sprite
        });
    }
    randomnum(){
        appear = Math.floor(Math.random() * 2);
        xCo = Math.floor(Math.random() * game.config.width);
        xCo1 = Math.floor(Math.random() * game.config.width);
        xCo2 = Math.floor(Math.random() * game.config.width);
    }

}