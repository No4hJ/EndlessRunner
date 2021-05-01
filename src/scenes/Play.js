class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    //load images
    preload() {
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
    }

    create() {        
        //condition of game ending
        lane = 2; //intialize lane
        this.gameOver = false; //game end or not
        this.hp = 2; //initialize health
        this.isSpawn = true; //spawn obstacle or not

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
        this.spawntimer = this.time.addEvent({
            delay: 3000,                // ms
            callback: () => {
                xCo = Math.floor(Math.random() * game.config.width);
                xCo1 = Math.floor(Math.random() * game.config.width);
                xCo2 = Math.floor(Math.random() * game.config.width);
                //appear = Math.floor(Math.random() * 3);
                //obsFrame = Math.floor(Math.random()*3);
                console.log(xCo, xCo1,xCo2);
            },
            callbackScope: null,
            loop: true
        });
        
        this.obstacle = new Obstacle(this, xCo, 100, 'obstacles', 0, 1).setScale(1); //obstacle
        this.mid = new Obstaclemid(this, xCo1, 100, 'obstacles', 1, 2).setScale(1); //obstacle
        this.big = new Obstaclebig(this, xCo2, 100, 'obstacles', 2, 2).setScale(1); //obstacle
        //this.mid.setVisible(false);
        //this.big.setVisible(false);

        //console.log(this.obstacle.getBounds());
        //console.log(this.ship.getBounds()); 
        //timer or travel how long
        this.left = this.add.sprite(320,240,'left').setScale(1).setInteractive();
        this.right = this.add.sprite(320,240,'right').setScale(1).setInteractive();
        this.ship = this.add.sprite(320,240,'ship').setScale(1).setInteractive();
        this.left.setVisible(false);
        this.right.setVisible(false);

        this.shipred = this.add.sprite(320,240,'shipred').setScale(1).setInteractive();
        this.shipred.setVisible(false);
        this.distanceText = this.add.text(64,38, this.distance +' miles.', scoreConfig);
        this.mileui = this.add.image(125,50, "mileui").setScale(1.1);
        //Gameover text
        //this.gameOvertext= this.add.text(220, 240, 'GAME OVER',scoreConfig).setOrigin(0.0);
        //this.gameOvertext.setVisible(false);
    }


    update() {
        this.shipred.setVisible(false);
        if(Math.floor(this.obstacle.scaleX) == 3) {
            startCheck = true;
        }

        if(startCheck) {
            console.log(this.checkCollision(this.ship,this.obstacle));
            if (this.checkCollision(this.ship,this.obstacle)) {
                startCheck = false;
                //this.ship.setTint(0xff0000);
                this.obstacle.reset();
                this.hp -= 1;
                this.shipred.setVisible(true);
                console.log("hit!");
                console.log(this.hp);
                //this.distance += 1;
                //this.score.text = this.distance;

            } else {
                startCheck = false;
                this.obstacle.reset();
                console.log("miss!");
                //this.distance += 1;
                //this.score.text = this.distance;
            }
        }

        if(Math.floor(this.mid.scaleX) == 4) {
            startCheckMid = true;
        }

        if(startCheckMid) {
            console.log(this.checkCollision(this.ship,this.mid));
            if (this.checkCollision(this.ship,this.mid)) {
                startCheckMid = false;
                //this.ship.setTint(0xff0000);
                this.mid.reset();
                this.hp -= 2;
                this.shipred.setVisible(true);
                console.log("hit! #mid");
                console.log(this.hp);
                //this.distance += 1;
                //this.score.text = this.distance;

            } else {
                startCheck = false;
                this.mid.reset();
                console.log("miss! #mid");
                //this.distance += 1;
                //this.score.text = this.distance;
            }
        }

        if(Math.floor(this.big.scaleX) == 5) {
            startCheckbig = true;
        }

        if(startCheckbig) {
            console.log(this.checkCollision(this.ship,this.big));
            if (this.checkCollision(this.ship,this.big)) {
                startCheckbig = false;
                //this.ship.setTint(0xff0000);
                this.big.reset();
                this.hp -= 1;
                this.shipred.setVisible(true);
                console.log("hit! #big");
                console.log(this.hp);
                //this.distance += 1;
                //this.score.text = this.distance;

            } else {
                startCheckbig = false;
                this.big.reset();
                console.log("miss! #big");
                //this.distance += 1;
                //this.score.text = this.distance;
            }
        }

        this.background.update(); 
        this.obstacle.update();
        this.mid.update();
        this.big.update();

        this.distanceTimer = setInterval(this.distanceCheck(),1000);
        
        if(this.hp <= 0) {
            this.gameOver = true;
            console.log(this.distance);
            playerscore = this.distance;
        }

        if(this.gameOver) {
            //this.gameOvertext.setVisible(false);
            this.scene.start('GameoverScene');
        }
        
        if(isLeft){
            this.ship.setVisible(false);
            this.left.setVisible(true);
        }
        else{
            this.ship.setVisible(true);
            this.left.setVisible(false);
        }
        if(isRight){
            this.ship.setVisible(false);
            this.right.setVisible(true);
        }
        else{
            this.ship.setVisible(true);
            this.right.setVisible(false);
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

}