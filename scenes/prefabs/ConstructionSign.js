//Couldn't find a way to uncollide the construction sign, so I just
//put two different classes. ¯\_(ツ)_/¯

class ConstructionSign extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'constructionSign');
        this.setScale(0.03);
        scene.add.existing(this);
    }
}

class SolidConstructionSign extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'constructionSign');
        this.setScale(0.03);
        this.setStatic(true)
        scene.add.existing(this);
    }
}