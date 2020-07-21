class DamWater extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'water');
        this.setScale(0.07);
        scene.add.existing(this);
    }
}