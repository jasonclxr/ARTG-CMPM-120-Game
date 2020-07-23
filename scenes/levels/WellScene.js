class WellScene extends Phaser.Scene {
    constructor() {
        super('WellScene');
    }

    create() {
        let background = this.add.image(0, 0, 'wellbackground').setOrigin(0, 0) ;
        background.displayHeight = game.config.height
        background.displayWidth = game.config.width
        this.matter.world.setBounds(400, 0, 400, game.config.height);

        this.add.text(game.config.width / 2, 30, 'Initial City Level: Well Scene', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);

        this.Character = new Character(this, game.config.width / 2, game.config.height/10);

        Fade(this, "In")
        let thiss = this
        setTimeout(function() {
            thiss.sound.play('splash');
            thiss.stateMachine.transition('idle');
        }, 1200)

        if (!inventory.has("Coin")) {
            this.Coin = new Coin(this, game.config.width / 2, game.config.height - 30);
            this.Character.setOnCollideWith(this.Coin, () => {
                console.log("touched coin");
            })
            this.Rope = new Rope(this, game.config.width/2, 700);
        }
        
        this.timeTravel = () => {
            console.log("time travel time");
            this.Character.WalkingSound.stop();
            this.scene.start("CityScene");
        }
    }

    update() {
        this.stateMachine.step();
    }
}