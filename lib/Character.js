class Character extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame, ground) {
        super(scene.matter.world, x, y, texture, frame);

        this.VELOCITY = 4;
        this.JUMP_VELOCITY = 4;
        scene.add.existing(this);
        this.setScale(SCALE);
        this.onGround = true;

        scene.matter.world.on("collisionactive", (skater, ground) => {
            this.onGround = true;

            //finish up later
        });
    }
}