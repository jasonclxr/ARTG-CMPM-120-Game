class Sapling extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'sapling');
        this.setScale(0.03);
        scene.add.existing(this);

        this.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });

        this.on('pointerdown', () => {
            if (Math.abs(this.x - scene.Character.x) <= obtainLength) {
                if ( inventory.has("Bucket") ) {
                    console.log("Watered tree");
                    treeBig = true;
                }
            }
        })
    }
}