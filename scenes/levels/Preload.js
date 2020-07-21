class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        this.load.image('background', './assets/pngs/backgroundtemp.png')
        this.load.image('emptywell', './assets/pngs/WellEmpty.png')
        this.load.image('fullwell', './assets/pngs/WellFull.png')
        this.load.image('wellbackground', './assets/pngs/WellScene.png')

        this.load.audio('gravelwet', './assets/sounds/gravel_steps_dry.mp3')
        this.load.audio('splash', './assets/sounds/sploosh.mp3')

        this.load.atlas('platformer_atlas', './assets/sprites/kenny_sheet.png', './assets/sprites/kenny_sheet.json');
        this.load.atlas('coin_atlas', './assets/sprites/coin_sheet.png', './assets/sprites/coin_sheet.json');
        this.load.atlas('char_atlas', './assets/sprites/char_sheet.png', './assets/sprites/char_sheet.json');

        console.log("Assets all loaded up!");
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('char_atlas', {
                prefix: 'CharRight',
                start: 0,
                end: 1,
                suffix: '',
                zeroPad: 1
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: 'char_atlas',
            frames: [
                { frame: 'CharRight0' }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: 'platformer_atlas',
            frames: [
                { frame: 'jump' }
            ],
        });

        this.anims.create({
            key: 'coinflip',
            frames: this.anims.generateFrameNames('coin_atlas', {
                prefix: 'Coin',
                start: 10,
                end: 20,
                suffix: '',
                zeroPad: 0
            }),
            frameRate: 25,
            repeat: 3
        });



        
        this.scene.start("CityScene");
    }

}