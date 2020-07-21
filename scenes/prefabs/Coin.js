class Coin extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'coin_atlas', 'Coin10');
        this.setScale(SCALE/6);
        scene.add.existing(this);

        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer'});

        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= 60) {
                console.log("Obtained coin");
                inventory.add("Coin", 1)
                this.destroy();
            }
        })

        this.on('pointerover', () => {
            console.log("Mouse entered")
        })

        this.on('pointerout', () => {
            console.log("Mouse left")
        })
    }

    flip() {
        this.anims.play('coinflip');
    }


}