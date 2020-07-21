class Pile extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'pile');
        this.setScale(0.08);
        this.setStatic(true);
        scene.add.existing(this);
    }
}