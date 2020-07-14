class WellLevel extends Phaser.Scene {
    constructor () {
        super('WellLevel');
    }

    preload() {
        this.load.atlas('platformer_atlas', './assets/kenny_sheet.png', './assets/kenny_sheet.json');
        console.log("Assets all loaded up!");
    }

    create() {

        this.cameras.main.setBackgroundColor('#227B96');
        this.add.text(game.config.width / 2, 30, 'Initial Well Level', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
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
            groundTile.setPosition(i + groundTile.centerOfMass.x, game.config.height/2 - tileSize + groundTile.centerOfMass.y);  // position (0,280)
            groundTile.setStatic(true);
            this.ground.add(groundTile);
        }

        for (let i = game.config.width/2; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i*0.9 + groundTile.centerOfMass.x, game.config.width - i/2 + 190);  // position (0,280)
            groundTile.setStatic(true);
            groundTile.setAngle(64)
            this.ground.add(groundTile);
        }
        this.character = new Character(this, game.config.width / 10, game.config.height/2 - tileSize * 2, 'platformer_atlas', 'front', this.ground);
        this.stateMachine = new StateMachine('time', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            time: new TimeTravelState(),
        }, [this, this.character]);

        let fade = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0, 0);
        for (var i = 100; i > 0; i--) {
            let f = i;
            setTimeout(function() {
                fade.setAlpha(1 - f/100);
            }, i*10)
        }
        let s = this.stateMachine
        setTimeout(function() {
            s.transition('idle');
        }, 1200)
    }

    update() {
        this.stateMachine.step();
    }
}