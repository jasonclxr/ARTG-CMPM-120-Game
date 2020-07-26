class Bucket extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'emptybucket');
        this.setScale(0.015);
        this.setStatic(true);
        scene.add.existing(this);

        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });

        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= obtainLength) {
                if (inventory.add(scene, "emptybucket")) {
                    this.destroy();
                }
               
            }
        })
    }
}