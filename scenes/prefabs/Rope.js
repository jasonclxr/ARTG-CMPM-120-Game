class Rope extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'rope');
        this.setScale(0.04);
        scene.add.existing(this);

        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer'});
        
        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= 70) {
                console.log("Obtained rope");
                inventory.add("Rope", 1)
                this.destroy();
            }
        })
    }
}