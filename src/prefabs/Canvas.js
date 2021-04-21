//background canvas prefab
class Canvas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

    //add objet to the existing scenes
    scene.add.existing(this);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && lane < 3) {
            this.x -= 300;
            lane += 1;
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && lane > 1) {
            this.x += 300;
            lane -= 1;
        }

        if(keyA.isDown) {
            this.angle += 1;
            console.log(this.angle);
        }

        if(keyD.isDown) {
            this.angle -= 1;
            console.log(this.angle);
        }
    }
}