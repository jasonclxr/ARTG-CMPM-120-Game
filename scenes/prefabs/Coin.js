//Coin class. The player can click the coin and the coin will go in their inventory.

class Coin extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'coin_atlas', 'Coin10');
        this.setScale(SCALE/5);
        this.setStatic(true)
        scene.add.existing(this);

        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer'});

        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= obtainLength) {
                if (inventory.add(scene, "coin_atlas")) {
                    scene.sound.play('coin_pickup');
                    this.destroy();
                }
            } else {
                scene.sound.play('too_far_away')
            }
        })
    }
}