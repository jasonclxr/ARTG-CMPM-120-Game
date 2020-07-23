class Sapling extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'sapling');
        this.setScale(0.03);
        scene.add.existing(this);
    }
}