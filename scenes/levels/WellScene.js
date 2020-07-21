class WellScene extends Phaser.Scene {
    constructor() {
        super('WellScene');
    }

    create() {
        let background = this.add.image(0, 0, 'wellbackground').setOrigin(0, 0) ;
        background.displayHeight = game.config.height
        background.displayWidth = game.config.width
        this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

        this.add.text(game.config.width / 2, 30, 'Initial City Level: Well Scene', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);

        this.Character = new Character(this, game.config.width / 2, game.config.height/10);

        Fade(this, "In")
        let thiss = this
        setTimeout(function() {
            thiss.sound.play('splash');
            thiss.stateMachine.transition('idle');
        }, 1200)

        this.Coin = new Coin(this, game.config.width / 2, game.config.height - 30);

        this.Character.setOnCollideWith(this.Coin, () => {
            console.log("touched coin");
        })

        this.Coin.setInteractive();

        this.Coin.on('pointerdown', () => {
            console.log(Math.abs(this.Coin.x - this.Character.x))
            if (Math.abs(this.Coin.x - this.Character.x) <= 60) {
                console.log("Obtained coin");
                inventory.add("Coin", 1)
                this.Coin.destroy();
            }
        })

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