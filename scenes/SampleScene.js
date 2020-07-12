class SampleScene extends Phaser.Scene {
    constructor () {
        super('SampleScene');
    }

    preload() {
        this.load.atlas('platformer_atlas', './assets/kenny_sheet.png', './assets/kenny_sheet.json');

        console.log("Assets all loaded up!");
    }

    create() {
        this.cameras.main.setBackgroundColor('#227B96');
        this.add.text(game.config.width / 2, 30, 'Sample State Machine', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.keys = this.input.keyboard.createCursorKeys();
        this.physics.world.gravity.y = 3000;
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_atlas', {
                prefix: 'walk',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            defaultTextureKey: 'platformer_atlas',
            frames: [
                { frame: 'front' }
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

        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for (let e = 0; e < 4; e++) {
            for (let i = 0; i < 5; i++) {
                let groundTile = this.physics.add.sprite(i * tileSize + 125 + 125 * Math.pow(-1, e), 650 - 100 * e, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
                groundTile.body.immovable = true;
                groundTile.body.allowGravity = false;
                this.ground.add(groundTile);
            }
        }

        for (let i = 0; i < 20; i++) {
            let groundTile = this.physics.add.sprite(i * tileSize + 125, 200, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.character = new Character(this, game.config.width / 10, game.config.height - tileSize * 4, 'platformer_atlas', 'front', this.ground);

        this.stateMachine = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
        }, [this, this.character]);


    }

    update() {
        this.stateMachine.step();

    }

}