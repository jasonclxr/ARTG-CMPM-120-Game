class WellScene extends Phaser.Scene {
    constructor() {
        super('WellScene');
    }

    preload() {
        this.load.image('wellbackground', './assets/WellScene.png')
    }

    create() {
        let background = this.add.image(0, 0, 'wellbackground').setOrigin(0, 0) ;
        background.displayHeight = game.config.height
        background.displayWidth = game.config.width
        this.matter.world.setBounds(270, 0, 260, game.config.height*0.95);

        this.add.text(game.config.width / 2, 30, 'Initial City Level: Well Scene', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.keys = this.input.keyboard.createCursorKeys();

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

        this.character = new Character(this, game.config.width / 2, game.config.height/10, 'char_atlas', 'CharRight0', this.ground);
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
        let thiss = this
        setTimeout(function() {
            thiss.sound.play('splash');
            thiss.stateMachine.transition('idle');
        }, 1200)
       
    }

    update() {
        this.stateMachine.step();
    }
}