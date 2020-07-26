class CityScene_Present extends Phaser.Scene {
    constructor () {
        super('CityScene_Present');
    }
    create() {
        let presentBackground = this.add.image(0, 0, 'citypresent').setOrigin(0, 0) ;
        presentBackground.displayHeight = game.config.height
        presentBackground.displayWidth = game.config.width

        this.add.text(game.config.width / 2, 30, 'City Scene - Present', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.matter.world.setBounds(0, 0, game.config.width, 738);

        if (!inventory.has("emptybucket")) {
            let bucket = new Bucket(this, 300, 710)
        }
        
        this.emptyWell = this.matter.add.image(760, 700, 'emptywell').setScale(0.15)
        this.emptyWell.setStatic(true);

        let thiss = this
        if (inventory.has("coin_atlas")) {
            this.Character = new Character(this, 850, 700);
            this.Character.setOnCollideWith(this.ConstructionSign, () => {
                this.Character.WalkingSound.stop()
                prevX = 1170
                prevY = 500

                Fade(this, "Out");
                setTimeout(function () {
                    thiss.scene.start("DamnScene_Future");
                }, 1000)
            })
        } else {
            this.Character = new Character(this, game.config.width / 10, game.config.height / 2 - tileSize * 2);
        }
        Fade(this, "In")
        
        setTimeout(function() {
            thiss.stateMachine.transition('idle');
        }, 800)

        this.Character.setOnCollideWith(this.emptyWell, () => {
            this.Character.WalkingSound.stop()

            Fade(this, "Out");
            setTimeout(function () {
                thiss.scene.start("WellScene");
            }, 1000)
        })

        this.timeTravel = () => {
            console.log("cannot time travel here");
        }

        this.InventoryGui = new InventoryGui(this);
    }

    update() {
        this.stateMachine.step();
    }
}