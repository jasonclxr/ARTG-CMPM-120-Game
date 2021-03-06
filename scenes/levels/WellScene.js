//the well scene. your prime objective is to grab the coin, the rope and flip the coin to get
//out of the well.

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
        this.Character = new Character(this, game.config.width / 2, game.config.height / 10, 'gravelwet');
        Fade(this, "In")
        let thiss = this
        setTimeout(function() {
            thiss.sound.play('splash');
            thiss.stateMachine.transition('idle');
            
            thiss.sound.play('well_into_vo')

        }, 1200)

        if (!inventory.has("coin_atlas")) {
            this.Coin = new Coin(this, game.config.width / 2 - 75, game.config.height - 10);
        }

        if (!inventory.has('rope')) {
            this.Rope = new Rope(this, 700, 780);
        }
        
        this.timeTravel = () => {
            console.log("teleport")
            this.Character.WalkingSound.stop();
            prevX = 850
            prevY = 700
            this.scene.start("CityScene_Future");
        }
        this.InventoryGui = new InventoryGui(this);
    }

    update() {
        this.stateMachine.step();
    }
}