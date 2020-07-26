class Screwdriver extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'screwdriver');
        this.setScale(0.02);
        this.setStatic(true);
        scene.add.existing(this);

        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });

        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= obtainLength) {
                console.log("Obtained screwdriver");
                if (inventory.add(scene, "screwdriver")) {
                    this.destroy();
                }
                
            }
        })
    }
}