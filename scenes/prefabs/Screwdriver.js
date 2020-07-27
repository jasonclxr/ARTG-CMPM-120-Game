//To be used for unscrewing the crank in the future

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
                scene.sound.play('screwdriver_pickup')
                if (inventory.add(scene, "screwdriver")) {
                    this.destroy();
                }
            } else {
                scene.sound.play('too_far_away')
            }
        })
        
        
        this.Hover = new HoverOver(scene, this, 'screwdriverGlow')
    }

    destroy() {
        this.Hover.destroy()
        super.destroy()
    }
}