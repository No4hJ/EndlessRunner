// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Credit, Tutorial ]
}

let game = new Phaser.Game(config);

//globalized text font
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
};

let lane = 2; //lane
let keyA, keyD, keyLEFT, keyRIGHT; //reserve key
let startCheck = false; //start checking collision
let isCollided = false; //check colision
let isLeft, isRight; //used to control obstacle movement
