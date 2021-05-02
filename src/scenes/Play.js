class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    //load images & sounds
    preload() {
        this.load.audio('playbgm', './assets/void_ingame.wav');
        this.load.image('earth', './assets/earth_.png');
        this.load.image('ship', './assets/spaceship.png');
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
            volume: 0.5,
            loop: true,
        });

        //condition of game ending
        lane = 2; //intialize lane
        this.gameOver = false; //game end or not
        this.hp = 5; //initialize health
        this.isSpawn = true; //spawn obstacle or not

        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('rightgif',{
                start: 0,
                end:3,
                first: 0
            }),
            frameRate: 8
        });

        this.anims.create({
            key:'shipred',
            frames: this.anims.generateFrameNumbers('spaceship_red',{
                start: 0,
                end:6,
            }),
            frameRate: 8
        });

        this.anims.create({
            key:'left',
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
        
        this.obstacle = new Obstacle(this, xCo, 100, 'obstacles', 0, 1).setScale(1); //obstacle
        this.mid = new Obstaclemid(this, xCo1, 100, 'obstacles', 1, 2).setScale(1); //obstacle
        this.big = new Obstaclebig(this, xCo2, 100, 'obstacles', 2, 3).setScale(2); //obstacle
        this.obstacle.angle = turn;
        this.mid.angle = turn;
        this.big.angle = turn;
        this.obstacle.alpha = 0;
        this.mid.alpha = 0;
        this.big.alpha = 0;

        this.ship = this.add.sprite(320,240,'ship').setScale(1).setInteractive();
        
        this.playright = this.add.sprite(0, 0, 'rightgif').setOrigin(0, 0);
        this.playleft = this.add.sprite(0, 0, 'leftgif').setOrigin(0, 0);
        this.spaceship_red = this.add.sprite(0, 0, 'spaceship_red').setOrigin(0, 0);
        this.playright.alpha = 0;
        this.playleft.alpha = 0;
        this.spaceship_red.alpha = 0;

        
        this.mileui = this.add.image(125,50, "mileui").setScale(1.1);
        this.distanceText = this.add.text(64,38, this.distance +' Miles', scoreConfig);
        this.time.addEvent({
               delay: 50,                // ms
               callback: () => {
                   this.distance += 5;
                   this.distanceText.text = this.distance + ' Miles';
                },
                callbackScope: null,
                loop: true
            });
    
       

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
        //enlarge obstacle (small)
        if(Math.floor(this.obstacle.scaleX) == 4) {
            startCheck = true;
        }

        //check collision
        if(startCheck) {
            if (this.checkCollision(this.ship,this.obstacle)) {
                startCheck = false;
                this.hp -= 1;
                this.damamgedship();
                console.log("hit!");
                console.log(this.hp);
                this.randomnum();
                this.obstacle.reset();
            } else {
                startCheck = false;
                console.log("miss!");
                this.randomnum();
                this.obstacle.reset();
            }
        }

        if(Math.floor(this.mid.scaleX) == 5) {
            startCheckMid = true;
        }

        if(startCheckMid) {
            console.log("yes");
            console.log(this.checkCollision(this.ship,this.mid));
            if (this.checkCollision(this.ship,this.mid)) {
                startCheckMid = false;
                this.hp -= 2;
                this.damamgedship();
                console.log("hit! #mid");
                console.log(this.hp);
                this.randomnum();
                this.mid.reset();
            } else {
                startCheckMid = false;
                console.log("miss! #mid");
                this.randomnum();
                this.mid.reset();
            }
        }

        if(Math.floor(this.big.scaleX) == 7) {
            startCheckbig = true;
        }

        if(startCheckbig) {
            if (this.checkCollision(this.ship,this.big)) {
                startCheckbig = false;
                this.hp -= 3;
                this.damamgedship();
                console.log("hit! #big");
                console.log(this.hp);
                this.randomnum();
                this.big.reset();
            } else {
                startCheckbig = false;
                console.log("miss! #big");
                this.randomnum();
                this.big.reset();
            }
        }

        this.background.update(); 
        
        if(appear==0) {
            this.obstacle.update();
            this.obstacle.alpha = 1;

        }else if(appear == 1) {
            this.mid.update();
            this.mid.alpha = 1;
        
        }else if(appear == 2) {
            this.big.update();
            this.big.alpha = 1;
        }
        
        if(this.hp <= 0) { //gameover condition
            this.gameOver = true;
        }

        if(this.gameOver) {
            playmusic.stop();
            playerscore = this.distance;
            this.scene.start('GameoverScene');
        }
        
        if(isLeft){
            this.ship.alpha = 0;
            this.playright.alpha = 0;
            this.playleft.alpha = 1;
            this.playleft.anims.play('left');
            this.playleft.on('animationcomplete', () => {    // callback after anim completes
                this.ship.alpha = 1;                      // make ship visible again
                this.playleft.alpha = 0;                       // remove explosion sprite
              });
        }
        if(isRight){
            this.ship.alpha = 0;
            this.playleft.alpha = 0;
            this.playright.alpha = 1;
            this.playright.anims.play('right');
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

    damamgedship(){
        this.ship.alpha = 0;
        this.playleft.alpha = 0;
        this.playright.alpha = 0;
        this.spaceship_red.alpha = 1;
        this.spaceship_red.anims.play('shipred');

        this.spaceship_red.on('animationcomplete', () => {    // callback after anim completes
            this.ship.alpha = 1;                      // make ship visible again
            this.spaceship_red.alpha = 0;                       // remove explosion sprite
        }); 
    }

    randomnum(){
        turn = Math.floor(Math.random() * 360);
        appear = Math.floor(Math.random() * 3);
        xCo = Math.floor(Math.random() * game.config.width);
        xCo1 = Math.floor(Math.random() * game.config.width);
        xCo2 = Math.floor(Math.random() * game.config.width);
        console.log(turn);
        console.log(xCo);
    }

}