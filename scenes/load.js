class load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.atlas('platformer_atlas', './assets/kenny_sheet.png', './assets/kenny_sheet.json');
        this.load.image('arrowKey', './assets/arrowKey.png');
        this.load.image('talltrees', './assets/talltrees.png');
        this.load.image('groundScroll', './assets/ground.png');
        this.load.atlasXML('shooter_atlas', './assets/shooter_sheet.png', './assets/shooter_sheet.xml');
        console.log("Assets all loaded up!");
    }

    create() {
        this.scene.start('testScene');
    }
}