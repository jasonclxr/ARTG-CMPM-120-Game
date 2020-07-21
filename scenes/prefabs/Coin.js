class Coin extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'coin_atlas', 'Coin10');
        this.setScale(SCALE/6);
        scene.add.existing(this);
    }

    flip() {
        this.anims.play('coinflip');
    }


}