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

        this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i + groundTile.centerOfMass.x, game.config.height - tileSize + groundTile.centerOfMass.y);  // position (0,280)
            groundTile.setStatic(true);

            this.ground.add(groundTile);
        }

        for (let e = 0; e < 4; e++) {
            for (let i = 0; i < 5; i++) {
                let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
                groundTile.setPosition(i * tileSize + 125 + 125 * Math.pow(-1, e) + groundTile.centerOfMass.x, 650 - 100 * e + groundTile.centerOfMass.y);  // position (0,280)
                groundTile.setStatic(true);
                this.ground.add(groundTile);
            }
        }
       
        for (let i = 0; i < 20; i++) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE);
            groundTile.setPosition(i * tileSize + 125 + groundTile.centerOfMass.x, 200 + groundTile.centerOfMass.y);  // position (0,280)
            groundTile.setStatic(true);
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