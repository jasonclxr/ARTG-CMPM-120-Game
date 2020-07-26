class Crank extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'crankHandle');

        this.CrankBase = scene.add.image(x, y, 'crankBase')
        this.CrankBase.setScale(0.04)
        this.setScale(0.04);
        scene.add.existing(this);
    }
}