//this is just so I can create collision boundaries for players to walk on.

class Line extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'line');
        this.setScale(0.1);
        this.displayWidth = 960
        
        this.setStatic(true);
        scene.add.existing(this);
    }
}