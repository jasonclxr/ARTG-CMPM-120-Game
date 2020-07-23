class DamWater extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'water');
        this.setScale(0.1);
        scene.add.existing(this);
    }
}