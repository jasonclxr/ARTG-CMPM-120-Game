class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin_atlas', 'Coin10');
        this.setScale(SCALE)/2;
        scene.add.existing(this);

        this.anims.play('coinflip');

    }

    flip() {
        
    }
}