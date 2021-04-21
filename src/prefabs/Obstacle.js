//obstacles prefab
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, damage){
        super(scene, x, y, texture, frame);

        //add object to the existing scenes
        scene.add.existing(this);
        this.damage = damage; // store damageCost
    }

    update() {

        this.alpha = 1;

        if(!startCheck) {
            this.scaleX += .01;
            this.scaleY += .01;
            this.y += .1;
        }

        if(isLeft) {
            this.x -= 300;
        }

        if(isRight) {
            this.x += 300;
        }

        if(keyA.isDown) {
            this.angle += 1;
        }

        if(keyD.isDown) {
            this.angle -= 1;
        }
    }

    reset() {
        this.alpha = 0;
        this.y = 100;
        this.scaleX = 1;
        this.scaleY = 1;

    }
}