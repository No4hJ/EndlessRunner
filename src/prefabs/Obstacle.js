//obstacles prefab
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, damage){
        super(scene, x, y, texture, frame);

        //add object to the existing scenes
        scene.add.existing(this);
        this.damage = damage; // store the damage cost to player (small cost 1 medium and large cost 2)
    }

    update() {

        //set it back to visible
        this.alpha = 1;

        //before it reach the edge
        if(!startCheck) {
            this.scaleX += .01;
            this.scaleY += .01;
            this.x += .05;
            this.y += .05;
        }

        //go left when canvas goes left
        if(isLeft) {
            this.x -= 300;
        }

        //go right when canvas goes right
        if(isRight) {
            this.x += 300;
        }

        //rotate right as the canvas rotates right
        if(keyA.isDown) {
            this.angle += 1;
            this.x += 2;
            this.y += 0.3;
        }

        //rotate left as the canvas rotates left
        if(keyD.isDown) {
            this.angle -= 1;
            this.x -= 2;
            this.y += 0.3;
        }
    }

    //reset the obstacle back to initial state after checking collision
    reset() {
        this.alpha = 0; //make it invisble for a sec
        this.x = xCo;
        this.y = yCo; //back to intial position
        this.angle = 0;
        this.scaleX = 1; //back to initial size
        this.scaleY = 1; // back to initial size

    }
}