class Crack extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'bigCrack');
        this.setScale(0.05);
        this.setStatic(true);
        scene.add.existing(this);
    }
}