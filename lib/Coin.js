class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
    }

    flip() {
        //fill out in next sprint
    }
}