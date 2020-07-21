class Oil extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'oil');
        this.setScale(0.015);
        this.setStatic(true);
        scene.add.existing(this);

        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= 70) {
                console.log("Obtained oil");
                inventory.add("Oil", 1)
                this.destroy();
            }
        })
    }
}