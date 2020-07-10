class load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.atlas('platformer_atlas', './assets/kenny_sheet.png', './assets/kenny_sheet.json');
        this.load.image('trees', './assets/talltrees.png');

        console.log("Assets all loaded up!");
    }

    create() {
        this.scene.start('testScene');
    }
}