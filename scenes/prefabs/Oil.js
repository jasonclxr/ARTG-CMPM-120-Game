//"you need oil? story of my life" -Nathan Altice 2020

class Oil extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'oil');
        this.setScale(0.015);
        this.setStatic(true);
        scene.add.existing(this);

        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });

        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= obtainLength) {
                inventory.add(scene, "oil")
                this.destroy();
            }
        })

        this.Hover = new HoverOver(scene, this, 'oilGlow')
    }

    destroy() {
        this.Hover.destroy()
        super.destroy()
    }
}