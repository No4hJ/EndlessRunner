//background canvas prefab
class Canvas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to the existing scenes
        scene.add.existing(this);
    }

    update() {
        isLeft = false;
        isRight = false;

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && lane < 3) {
            this.x -= 300;
            lane += 1;
            isLeft = true;
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && lane > 1) {
            this.x += 300;
            lane -= 1;
            isRight = true;
        }

        if(keyA.isDown) {
            this.angle += 1;
        }

        if(keyD.isDown) {
            this.angle -= 1;
        }
    }
}