class RopeLadder extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'ladderRope');
        this.setScale(0.04);
        this.setStatic(true);
        scene.add.existing(this);
    }
}