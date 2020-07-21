class FloodWater extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'floodWater');
        this.setScale(0.5);
        scene.add.existing(this);
    }
}