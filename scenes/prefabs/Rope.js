class Rope extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'rope');
        this.setScale(0.03);
        scene.add.existing(this);
        this.setStatic(true)
        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer'});
        
        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= obtainLength) {
                if (inventory.add(scene, "rope")) {
                    this.destroy();
                }
                
            }
        })
    }
}