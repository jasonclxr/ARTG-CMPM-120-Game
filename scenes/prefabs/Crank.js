class Crank extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'crankHandle');

        this.CrankBase = scene.add.image(x, y, 'crankBase')
        this.CrankBase.setScale(0.04)
        this.setScale(0.04);
        this.setStatic(true);
        scene.add.existing(this);
    }
}