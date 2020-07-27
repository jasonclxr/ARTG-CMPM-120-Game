//Ladder class for being able to climb up to the final level

class Ladder extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'ladder');
        this.setScale(0.04);
        this.setStatic(true);
        scene.add.existing(this);

        this.Hover = new HoverOver(scene, this, 'ladderGlow')
    }

    destroy() {
        this.Hover.destroy()
        super.destroy()
    }
}