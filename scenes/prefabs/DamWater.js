//This class is for the dam water that'll appear after turning the cranks

class DamWater extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'newwater'); //use new water image
        this.displayHeight = 130
        this.displayWidth = 210
        scene.add.existing(this);
    }
}