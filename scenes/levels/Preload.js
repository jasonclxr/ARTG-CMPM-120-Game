class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        this.load.image('background', './assets/pngs/backgroundtemp.png')
        this.load.image('emptywell', './assets/pngs/WellEmpty.png')
        this.load.image('fullwell', './assets/pngs/WellFull.png')
        this.load.image('wellbackground', './assets/pngs/WellScene.png')

        this.load.image('rope', './assets/pngs/rope.png')
        this.load.image('leftsign', './assets/pngs/leftsign.png')
        this.load.image('damScene', './assets/pngs/damScene.png')
        this.load.image('pile', './assets/pngs/pile.png')
        this.load.image('crankBase', './assets/pngs/crankBase.png')
        this.load.image('crankHandle', './assets/pngs/crankHandle.png')
        this.load.image('bigCrack', './assets/pngs/bigCrack.png')
        this.load.image('constructionSign', './assets/pngs/constructionSign.png')
        this.load.image('constructionSignBroken', './assets/pngs/constructionSignBroken.png')
        this.load.image('ladder', './assets/pngs/ladder.png')
        this.load.image('ladderRope', './assets/pngs/ladderRope.png')
        this.load.image('littleCrack', './assets/pngs/littleCrack.png')
        this.load.image('oil', './assets/pngs/oil.png')
        this.load.image('rope', './assets/pngs/rope.png')
        this.load.image('sapling', './assets/pngs/sapling.png')
        this.load.image('screwdriver', './assets/pngs/screwdriver.png')
        this.load.image('water', './assets/pngs/water.png')
        this.load.image('floodWater', './assets/pngs/FloodWater.png')
        this.load.image('bucket', './assets/pngs/bucket.png')
        this.load.image('line', './assets/pngs/Line.png')

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