//Crank class. This is what's used for turning the water on and off.

class Crank extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'crankHandle');

        this.CrankBase = scene.add.image(x, y, 'crankBase')
        this.CrankBase.setScale(0.04)
        this.setScale(0.04);
        scene.add.existing(this);

        this.Hover = new HoverOver(scene, this, 'crankHandleGlow')
        this.Hover.Image.setScale((this.scale/2) * 1.05)
    }

    destroy() {
        this.Hover.destroy()
        super.destroy()
    }
}