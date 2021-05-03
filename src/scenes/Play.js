class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    
    preload() {
        //load images & spritesheets & sounds
        this.load.audio('playbgm', './assets/void_ingame.wav');
        this.load.audio('start', './assets/void_start.wav');
        this.load.audio('alert','./assets/void_alert.wav');
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
         //condition of game ending
        lane = 2; //intialize location for the player
        this.gameOver = false; //game end or not
        this.hp = 5; //initialize health
        this.isSpawn = true; //spawn obstacle or not
        speed = 0.01; //initial obstacle speed
        menumusic.stop(); //stop the menu background music when enter play scene

        //create music and anim config  
        playmusic = this.sound.add('playbgm', {
            volume: 0.5,
            loop: true,
        });

        this.startsound = this.sound.add('start', {
            volume: 0.7
        });

        this.alertsound = this.sound.add('alert');

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
                first: 0
            }),
            frameRate: 3
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

        this.startsound.play(); //play the sound effect that symbolize starting
        this.distanceText; //show the distance on top left
        this.distance = 0; //intialize distance

        //display contents

        this.background = new Canvas(this, 320, 440, 'earth').setOrigin(0.5, 0.5); //background

        //particle
        this.p = this.add.particles('lines', [
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

        //define user input keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //create obstacles
        this.obstacle = new Obstacle(this, xCo, yCo, 'obstacles', 0, 1).setScale(1); //small obstacle
        this.mid = new Obstaclemid(this, xCo1, yCo, 'obstacles', 1, 2).setScale(1); //medium obstacle
        this.big = new Obstaclebig(this, xCo2, yCo, 'obstacles', 2, 3).setScale(2); //large obstacle
        this.obstacle.angle = turn; //intialize their angle to a random number
        this.mid.angle = turn; //intialize their angle to a random number
        this.big.angle = turn; //intialize their angle to a random number
        this.obstacle.alpha = 0; //make them invisible at first
        this.mid.alpha = 0; //make them invisible at first
        this.big.alpha = 0; //make them invisible at first

        //create the spaceship
        this.ship = this.add.sprite(320,240,'ship').setScale(1).setInteractive();
        
        //create the anims sprite and make them invisible
        this.playright = this.add.sprite(0, 0, 'rightgif').setOrigin(0, 0); //move left anim
        this.playleft = this.add.sprite(0, 0, 'leftgif').setOrigin(0, 0); //move right anim
        this.spaceship_red = this.add.sprite(0, 0, 'spaceship_red').setOrigin(0, 0); //hit alert anim
        this.playright.alpha = 0;
        this.playleft.alpha = 0;
        this.spaceship_red.alpha = 0;
        
        //display distance on top left
        this.mileui = this.add.image(125,50, "mileui").setScale(1.1);
        this.distanceText = this.add.text(64,38, this.distance +' Miles', scoreConfig);
        
        //timer that count the distance & increase difficulty
        this.time.addEvent({
               delay: 50,                // ms
               callback: () => {
                   this.distance += 5; //add distance every 50 ms
                   this.distanceText.text = this.distance + ' Miles'; //display it
                   //increase difficulty every 1500 miles 
                   if(this.distance % 1500 == 0){
                       speed += 0.007; //add the obstacle speed
                       this.p.speed = speed*50000; //make the particles faster to give a visual of going faster
                   }
                },
                callbackScope: null,
                loop: true
            });
    
       
        
        //play the background music
        if (!this.sound.locked)
        {
            // already unlocked so play
            playmusic.play();
        }
        else {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                playmusic.play();
            })
        }
    }


    update() {
        //if the game is not ending 
        if(!this.gameOver) {
            //collision check mechanics

            //enlarge obstacle (small)
            if(Math.floor(this.obstacle.scaleX) == 4) {
                startCheck = true;
            }

            //check collision for obstacle (small)
            if(startCheck) {
                //if collided
                if (this.checkCollision(this.ship,this.obstacle)) {
                    this.alertsound.play(); //play the alert sound effect
                    startCheck = false; //stop check
                    this.hp -= 1; //reduce hp
                    this.damamgedship(); //play the hit alert anim
                    console.log("hit!"); //debug use display
                    console.log(this.hp); //debug use display
                    this.randomnum(); //give random numbers for the obstacle for next reset
                    this.obstacle.reset(); //reset the obstacle to the random position
                } else {
                    startCheck = false; //stop check
                    console.log("miss!"); //debug use display
                    this.randomnum(); //give random numbers for the obstacle for next reset
                    this.obstacle.reset(); //reset the obstacle to the random position
                }
            }

            //enlarge obstacle (medium)
            if(Math.floor(this.mid.scaleX) == 5) {
                startCheckMid = true;
            }

            //check collision for obstacle (medium)
            if(startCheckMid) {
                if (this.checkCollision(this.ship,this.mid)) {
                    this.alertsound.play();
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

            //enlarge obstacle (large)
            if(Math.floor(this.big.scaleX) == 7) {
                startCheckbig = true;
            }

            //check colission for obstacle (large)
            if(startCheckbig) {
                if (this.checkCollision(this.ship,this.big)) {
                    this.alertsound.play();
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

            //the earth will move according to player input
            this.background.update(); 
            
            //random the type of the obstacle (S, M, L) that will appear next
            if(appear==0) {
                //small obstacle
                this.obstacle.update();
                this.obstacle.alpha = 1; //make it visible

            }else if(appear == 1) {
                //medium obstacle
                this.mid.update();
                this.mid.alpha = 1; //make it visible
            
            }else if(appear == 2) {
                //large obstacle
                this.big.update();
                this.big.alpha = 1; //make it visible
            }
            
            //play the anims for going left and right
            //go left
            if(isLeft){
                //make other sprites invisible 
                this.ship.alpha = 0;
                this.playright.alpha = 0;
                this.playleft.alpha = 1; //make the one we play visible
                this.playleft.anims.play('left'); //play the anim
                this.playleft.on('animationcomplete', () => { //callback after play
                    this.ship.alpha = 1; //make ship visible again                 
                    this.playleft.alpha = 0; //make anim sprite invisible 
                });
            }

            //go right
            if(isRight){
                //make other sprites invisible 
                this.ship.alpha = 0;
                this.playleft.alpha = 0;
                this.playright.alpha = 1; //make the one we play visible
                this.playright.anims.play('right'); //play the anim
                this.playright.on('animationcomplete', () => { //callback after play
                    this.ship.alpha = 1; //make ship visible again     
                    this.playright.alpha = 0; //make anim sprite invisible 
                }); 
            }

            //check if the game ends or not
            if(this.hp <= 0) { //gameover condition
                this.gameOver = true; //stop all the updates
            }
        }

        //after game ends
        if(this.gameOver) { 
            playerscore = this.distance; //finalilze the score
            this.scene.start('GameoverScene'); //go to gameover scene
        }
                
    }
    
    //collision check function
    //check collision source from https://phaser.io/examples/v2/sprites/overlap-without-physics
    //and https://phaser.io/examples/v3/view/geom/intersects/rectangle-to-rectangle
    checkCollision(ship,obstacles){
        return Phaser.Geom.Intersects.RectangleToRectangle(obstacles.getBounds(), ship.getBounds());
    }

    //play the hit alert anim (wrote it into a function so we won't write the same code three times)
    damamgedship(){
        //make other sprites invisible 
        this.ship.alpha = 0;
        this.playleft.alpha = 0;
        this.playright.alpha = 0;
        this.spaceship_red.alpha = 1; //make the one we play visible
        this.spaceship_red.anims.play('shipred'); //play the anim
        this.spaceship_red.on('animationcomplete', () => { //callback after play
            this.ship.alpha = 1; //make ship visible again 
            this.spaceship_red.alpha = 0; //make anim sprite invisible 
        }); 
    }

    //provide random parameters for our obstacles
    randomnum(){
        turn = Math.floor(Math.random() * 360); //random angle when appear
        appear = Math.floor(Math.random() * 3); //random type of obstacle that appear next (S, M, L)
        xCo = Math.floor(Math.random() * game.config.width); //random x coordinate for small obstacle
        xCo1 = Math.floor(Math.random() * game.config.width); //random x coordinate for medium obstacle
        xCo2 = Math.floor(Math.random() * game.config.width); //random x coordinate for large obstacle
    }

}