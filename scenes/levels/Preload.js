//the preload scene. thisll just load everything up, then take you to the menu scene. :3

class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        this.load.image('background', './assets/pngs/backgroundtemp.png')
        this.load.image('emptywell', './assets/pngs/WellEmpty.png')
        this.load.image('fullwell', './assets/pngs/WellFull.png')
        this.load.image('wellbackground', './assets/pngs/WellScene.png')
        this.load.image('endCredit1', './assets/pngs/Completed.png')
        this.load.image('menu', './assets/pngs/Menu.png')
        this.load.image('endCredit2', './assets/pngs/credits.png')

        this.load.image('rope', './assets/pngs/rope.png')
        this.load.image('leftsign', './assets/pngs/leftsign.png')
        this.load.image('damScenePresent', './assets/pngs/damScenePresent.png')
        this.load.image('damSceneFuture', './assets/pngs/damSceneFuture.png')
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
        this.load.image('newwater', './assets/pngs/water2.png')
        this.load.image('floodWater', './assets/pngs/FloodWater.png')
        this.load.image('fullbucket', './assets/pngs/bucket.png')
        this.load.image('emptybucket', './assets/pngs/EmptyBucket.png')
        this.load.image('line', './assets/pngs/Line.png')
        this.load.image('bigTree', './assets/pngs/Tree.png')
        this.load.image('inventory', './assets/pngs/Inventory.png')
        this.load.image('cityfuture', './assets/pngs/CityFuture.png')
        this.load.image('citypresent', './assets/pngs/CityPresent.png')
        this.load.image('bigTreeGlow', './assets/pngs/TreeGlow.png')
        this.load.image('screwdriverGlow', './assets/pngs/ScrewdriverGlow.png')
        this.load.image('saplingGlow', './assets/pngs/SaplingGlow.png')
        this.load.image('ropeGlow', './assets/pngs/RopeGlow.png')
        this.load.image('oilGlow', './assets/pngs/OilGlow.png')
        this.load.image('ladderGlow', './assets/pngs/LadderGlow.png')
        this.load.image('crankHandleGlow', './assets/pngs/CrankGlow.png')
        this.load.image('bucketGlow', './assets/pngs/BucketGlow.png')

        this.load.audio('gravelwet', './assets/sounds/gravel_steps_wet.mp3')
        this.load.audio('splash', './assets/sounds/sploosh.mp3')
        this.load.audio('bucket', './assets/sounds/buccet.mp3')
        this.load.audio('graveldry', './assets/sounds/gravel_steps_dry.mp3')
        this.load.audio('drips', './assets/sounds/lots_of_drops.mp3')
        this.load.audio('coinflip', './assets/sounds/Coin_final.mp3')
        this.load.audio('wheel', './assets/sounds/Coin_final.mp3')
        this.load.audio('rope', './assets/sounds/ROOOOOPE.mp3')
        this.load.audio('screwdriver', './assets/sounds/Screwdriver_final_sfx.mp3')


        this.load.atlas('platformer_atlas', './assets/sprites/kenny_sheet.png', './assets/sprites/kenny_sheet.json');
        this.load.atlas('coin_atlas', './assets/sprites/coin_sheet.png', './assets/sprites/coin_sheet.json');
        this.load.atlas('char_atlas', './assets/sprites/char_sheet.png', './assets/sprites/char_sheet.json');
        console.log("Loading all assets, this may take about 10-15 seconds");

        this.add.text(game.config.width / 2, game.config.height / 2, 'loading all assets, just give it a sec!', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
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
            frameRate: 50,
            repeat: 6
        });
        console.log("Assets all loaded up!");

        this.scene.start("EndCredits");
    }

}