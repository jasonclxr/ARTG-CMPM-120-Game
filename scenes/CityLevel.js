class CityLevel extends Phaser.Scene {
    constructor () {
        super('CityLevel');
    }

    preload() {
        this.load.image('background', './assets/backgroundtemp.png')
        this.load.image('emptywell', './assets/WellEmpty.png')
        this.load.image('fullwell', './assets/WellFull.png')

        this.load.audio('gravelwet', './assets/gravel_steps_dry.mp3')
        this.load.audio('splash', './assets/sploosh.mp3')

        this.load.atlas('platformer_atlas', './assets/kenny_sheet.png', './assets/kenny_sheet.json');
        this.load.atlas('coin_atlas', './assets/coin_sheet.png', './assets/coin_sheet.json');
        this.load.atlas('char_atlas', './assets/char_sheet.png', './assets/char_sheet.json');
        console.log("Assets all loaded up!");
    }

    create() {
        let presentBackground = this.add.image(0, 0, 'background').setOrigin(0, 0) ;
        presentBackground.displayHeight = game.config.height/2
        presentBackground.displayWidth = game.config.width*2

        let futureBackground = this.add.image(0, game.config.height/2, 'background').setOrigin(0, 0) ;
        futureBackground.displayHeight = game.config.height/2
        futureBackground.displayWidth = game.config.width*2
        futureBackground.alpha = 0.5;
        this.add.text(game.config.width / 2, 30, 'Initial City Level', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.keys = this.input.keyboard.createCursorKeys();
        
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

        this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i + groundTile.centerOfMass.x + tileSize/2, game.config.height/2 + groundTile.centerOfMass.y);  // position (0,280)
            groundTile.setStatic(true);
            this.ground.add(groundTile);
        }

        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i + groundTile.centerOfMass.x + tileSize/2, game.config.height + groundTile.centerOfMass.y);  // position (0,280)
            groundTile.setStatic(true);
            this.ground.add(groundTile);
            groundTile.setAlpha(0.65);
        }

        for (let i = game.config.width/2; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i*0.9 + groundTile.centerOfMass.x, game.config.width - i/2 - 210);  // position (0,280)
            groundTile.setStatic(true);
            groundTile.setAngle(61)
            this.ground.add(groundTile);
        }

        this.emptyWell = this.matter.add.image(760, 350, 'emptywell').setScale(0.15)
        this.emptyWell.setStatic(true);
        this.fullWell = this.matter.add.image(760, 750, 'fullwell').setScale(0.15)
        this.fullWell.setStatic(true);

        var soundConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.walkingSound = this.sound.add('gravelwet', soundConfig);

        this.character = new Character(this, game.config.width / 10, game.config.height/2 - tileSize * 2, 'char_atlas', 'CharRight0', this.ground);
        this.character.setScale(0.2,0.2)
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

        this.character.setOnCollideWith(this.emptyWell, () => {
            this.scene.start("WellScene");
        })

    }

    update() {
        this.stateMachine.step();
    }
}