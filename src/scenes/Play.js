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

        //load image
        this.background = new Canvas(this, 0, 0, 'earth').setOrigin(0, 0);
        this.paper = this.add.sprite(100,100, 'paper');
        console.log("play!");

        //make the image clickable
        this.paper.setInteractive();
        this.paper.on('pointerdown', () => {
            this.hp -= 1
        })

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        this.background.update(); 
        
        if(this.hp == 0) {
            this.gameOver = true;
        }

        if(this.gameOver) {
            this.scene.start('menuScene');
        }
    }
}