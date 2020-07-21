class LeftSign extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'leftsign');
        this.setScale(0.02);
        this.setStatic(true);
        scene.add.existing(this);
    }
}