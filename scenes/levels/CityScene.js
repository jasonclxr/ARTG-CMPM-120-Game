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
        this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i + groundTile.centerOfMass.x + tileSize/2, game.config.height/2 + groundTile.centerOfMass.y);
            groundTile.setStatic(true);
        }

        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.matter.add.sprite(0, 0, 'platformer_atlas', 'block').setScale(SCALE)
            groundTile.setPosition(i + groundTile.centerOfMass.x + tileSize/2, game.config.height + groundTile.centerOfMass.y); 
            groundTile.setStatic(true);
            groundTile.setAlpha(0.65);
        }
        if (!inventory.has("Bucket")) {
            let bucket = new Bucket(this, 300, 358)
        }
        

        this.emptyWell = this.matter.add.image(760, 350, 'emptywell').setScale(0.15)
        this.emptyWell.setStatic(true);
        this.fullWell = this.matter.add.image(760, 750, 'fullwell').setScale(0.15)
        this.fullWell.setStatic(true);

        this.ConstructionSign = new LeftSign(this, 40, 760);

        if (inventory.has("Coin")) {
            this.Character = new Character(this, 1000, 700);
            this.Character.setOnCollideWith(this.ConstructionSign, () => {
                this.Character.WalkingSound.stop()
                prevX = 1170
                prevY = 500
                this.scene.start("DamnScene_Future");
            })
        } else {
            this.Character = new Character(this, game.config.width / 10, game.config.height / 2 - tileSize * 2);
        }
        Fade(this, "In")
        
        let thiss = this
        setTimeout(function() {
            thiss.stateMachine.transition('idle');
        }, 800)

        this.Character.setOnCollideWith(this.emptyWell, () => {
            this.Character.WalkingSound.stop()
            this.scene.start("WellScene");
        })

        this.timeTravel = () => {
            console.log("cannot time travel here");
        }
    }

    update() {
        this.stateMachine.step();
    }
}