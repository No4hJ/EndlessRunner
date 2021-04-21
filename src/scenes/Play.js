class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    //load images
    preload() {
        this.load.image('earth', './assets/earth.png');
    }

    create() {
        //condition of game ending
        this.gameOver = false;
        this.hp = 2;

        //test objects
        this.background = new Canvas(this, game.config.width/2, game.config.height/2, 'earth').setOrigin(0.5, 0.5); //background
        this.paper = new Obstacle(this, 100,100, 'paper', 0, 1).setOrigin(0, 0); //obstacle
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
       
        if(Math.floor(this.paper.scaleX) == 13) {
            startCheck = true;
        }

        if(startCheck) {
            if (this.checkCollision(this.paper)) {
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

    checkCollision(obstacle) {
        // simple AABB checking
        if( obstacle.x < game.config.width &&
            obstacle.x + obstacle.width > 0 &&
            obstacle.y < game.config.height &&
            obstacle.height + obstacle.y > 0) {
                return true;
        } else {
            return false;
        }
    }

}