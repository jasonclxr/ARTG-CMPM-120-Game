class DamWater extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'newwater');
        this.displayHeight = 130
        this.displayWidth = 210
        scene.add.existing(this);
    }
}