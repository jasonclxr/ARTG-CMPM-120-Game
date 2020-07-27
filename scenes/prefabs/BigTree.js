//The big tree class. Used in present damn scene for players to climb on.

class BigTree extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'bigTree');
        this.setScale(0.04);
        this.setStatic(true);
        scene.add.existing(this);

        this.Hover = new HoverOver(scene, this, 'bigTreeGlow')
    }
}