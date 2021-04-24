class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    //load images
    preload() {
        this.load.image('earth', './assets/earth_.png');
        this.load.image('stone', './assets/stone.png');
        this.load.image('ship', './assets/Spaceship.png');
    }

    create() {
        //condition of game ending
        lane = 2; //intialize lane
        this.gameOver = false;
        this.hp = 20;

        //test objects
        this.background = new Canvas(this, 320, 440, 'earth').setOrigin(0.5, 0.5); //background
        this.paper = new Obstacle(this, 500,100, 'stone', 0, 1).setScale(1); //obstacle
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.ship = this.add.sprite(320,240,'ship').setScale(1);
        console.log(this.paper.getBounds());
        console.log(this.ship.getBounds()); 
    }


    update() {
        if(Math.floor(this.paper.scaleX) == 5) {
            startCheck = true;
        }

        if(startCheck) {
            console.log(this.checkCollision(this.ship,this.paper));
            if (this.checkCollision(this.ship,this.paper)) {
                startCheck = false;
                this.paper.reset();
                this.hp -= 1;
                console.log("hit!");
                console.log(this.hp);
            } else {
                startCheck = false;
                this.paper.reset();
                console.log("miss!");

            }
        }

        this.background.update(); 
        this.paper.update();
 
        if(this.hp == 0) {
            this.gameOver = true;
        }

        if(this.gameOver) {
            this.scene.start('menuScene');
        }
        
    }
    
    //check collision source from https://phaser.io/examples/v2/sprites/overlap-without-physics
    //and https://phaser.io/examples/v3/view/geom/intersects/rectangle-to-rectangle
    checkCollision(obstacles, ship){
        return Phaser.Geom.Intersects.RectangleToRectangle(obstacles.getBounds(), ship.getBounds());
    }
    
}