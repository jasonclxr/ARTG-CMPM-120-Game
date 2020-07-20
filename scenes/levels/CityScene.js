class CityScene extends Phaser.Scene {
    constructor () {
        super('CityScene');
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

        this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i + groundTile.centerOfMass.x + tileSize/2, game.config.height/2 + groundTile.centerOfMass.y);  // position (0,280)
            groundTile.setStatic(true);
        }

        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i + groundTile.centerOfMass.x + tileSize/2, game.config.height + groundTile.centerOfMass.y);  // position (0,280)
            groundTile.setStatic(true);
            groundTile.setAlpha(0.65);
        }

        for (let i = game.config.width/2; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i*0.9 + groundTile.centerOfMass.x, game.config.width - i/2 - 210);  // position (0,280)
            groundTile.setStatic(true);
            groundTile.setAngle(61)
        }

        this.emptyWell = this.matter.add.image(760, 350, 'emptywell').setScale(0.15)
        this.emptyWell.setStatic(true);
        this.fullWell = this.matter.add.image(760, 750, 'fullwell').setScale(0.15)
        this.fullWell.setStatic(true);

        this.Character = new Character(this, game.config.width / 10, game.config.height/2 - tileSize * 2);
        Fade(this, "In")
        let s = this.stateMachine
        setTimeout(function() {
            s.transition('idle');
        }, 1200)
        this.Character.setOnCollideWith(this.emptyWell, () => {
            this.scene.start("WellScene");
        })
    }

    update() {
        this.stateMachine.step();
    }
}