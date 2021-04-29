// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Credit, Tutorial ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
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

let lane; //player's lane
let xCo, xCo1, xCo2; //x coordinate of obstacles
let yCo = 200;//y coordiate of obstacles
//let obsFrame = 2;// frame for obstacles
//let damage;//damage per obstacles
//let appear;
let keyA, keyD, keyLEFT, keyRIGHT; //reserve key
let startCheck, startCheckMid, startCheckbig = false; //start checking collision
let isLeft, isRight; //used to control obstacle movement