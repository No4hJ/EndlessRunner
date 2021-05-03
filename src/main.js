/*
Collaborator Names: Noah Jiang, Zeyu Zhang, Bianca Hsieh. Go to in-game credit scene to see
the work distribution and contribution.

Game Title: Away From the Void

Date Completed: 5/3/2021

Creative Tilt Justification:
    techinically interesting: since we tried to make into a first perspective game, the way of
    movements of the player and the particles will be different from the usual 2D games made with phaser.
    In order to move the player left and right, we made the background (the earth in our game) and the
    obstacles to move left and right (in opposite directions from the player input) and made the spaceship
    in fixed position. We did the same thing to mimic rotation of the spaceship - just rotate the earth
    and the obstacles. In order to mimic the obstacle coming closer to the player, we just enlarge the scale of the 
    obstacles in a certain speed, and it turned out great. I'm also very proud of our own collision check mechanic. 
    After we've experimented as we sit in the car and observe through the windshield, we've discovered that we could
    check the collision in 98% of the cases by identifying if the obstacle appear on the screen or not when they are
    large enough. In this case, our collision check mechanic is to get the boundary of the ship and the obstacle when
    the obstacle is enlarged to a certain scale, and check if the boundaries intersect or not. This also turned out pretty great!

    creative in visual/sound/design: I think most of the endless runner that my groupmates and I played are either 2D horizontal
    and in third person. In this case, I think that making it in first person is pretty creative and interesting to play, since 
    players could be more immersive in the game since we all live in a first person perspective world. I'm very proud of our art
    and the visual artists in my group. I especially like the earth in the background with a pixel art style, and it gives a very 
    clear feedback to player's movements. The spaceship is also very delicately drawn. I'm also pretty satisfied with my background
    musics since I've tried new techiniques newly learnt in my MUSC124 class taking this quarter.
*/


// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Credit, Tutorial,Gameover ]
}

let game = new Phaser.Game(config);

//globalized text font
let scoreConfig = {
    fontFamily: 'system-ui',
    fontSize: '21px',
    backgroundColor: '#2f4673',
    color: '#6b97bb',
    align: 'right',
    fixedWidth: 0
};

let lane; //player's position (limited to 3 lanes - left, middle, right)

//coordinate of obstacles
let xCo = Math.floor(Math.random() * game.config.width); //x coordinate for small obstacle
let xCo1 = Math.floor(Math.random() * game.config.width); //x coordinate for medium obstacle
let xCo2 = Math.floor(Math.random() * game.config.width); //x coordinate for large obstacle
let yCo = 150;//fixed y coordiate of obstacles

let appear = Math.floor(Math.random() * 3); //type of obstacle (S, M, L)
let turn = Math.floor(Math.random() * 360); //angle of the obstacle when appear
let keyA, keyD, keyLEFT, keyRIGHT; //reserve key
let startCheck, startCheckMid, startCheckbig = false; //condition to start checking collision
let isLeft, isRight; //used to control obstacle movement
let playerscore = 0;//record the players score
let highscore = []; //store scores and find the highest
let menumusic, playmusic; //background musics for menu and game scene
let speed; //obstacle speed