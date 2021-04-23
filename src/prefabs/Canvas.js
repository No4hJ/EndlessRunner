//background canvas prefab
class Canvas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to the existing scenes
        scene.add.existing(this);
    }

    update() {
        //booleans to control the obstacles
        isLeft = false;
        isRight = false;

        //player moves right, canvas move left while it is not at the left lane
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && lane < 3) {
            this.x -= 300;
            lane += 1;
            isLeft = true;
        }

        //player moves left, canvas move right while it is not at the right lane
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && lane > 1) {
            this.x += 300;
            lane -= 1;
            isRight = true;
        }
        //player rotates left, canvas rotate right
        if(keyA.isDown) {
            this.angle += 1;
        }

        //player rotates right, canvas rotate left
        if(keyD.isDown) {
            this.angle -= 1;
        }
    }
}