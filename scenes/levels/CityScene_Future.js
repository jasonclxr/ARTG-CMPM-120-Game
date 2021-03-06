//The city future scene. in this scene you primarily just walk across to touch the sign. There's
//a couple functions for time traveling, and some conditionals for what to spawn.

class CityScene_Future extends Phaser.Scene {
    constructor () {
        super('CityScene_Future');
    }
    create() {
        let presentBackground = this.add.image(0, 0, 'cityfuture').setOrigin(0, 0) ;
        presentBackground.displayHeight = game.config.height
        presentBackground.displayWidth = game.config.width

        this.add.text(game.config.width / 2, 30, 'City Scene - Future', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.matter.world.setBounds(0, 0, game.config.width, 738);
        
        this.fullWell = this.matter.add.image(760, 700, 'fullwell').setScale(0.15)
        this.fullWell.setStatic(true);

        this.fullWell.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        this.fullWell.on('pointerdown', () => {
            if (Math.abs(this.fullWell.x - this.Character.x) <= obtainLength) {
                if (inventory.has('emptybucket')) {
                    inventory.remove(this, 'emptybucket');
                    inventory.add(this, 'fullbucket');
                }
            } else {
                this.sound.play('too_far_away')
            }
        })

        this.ConstructionSign = new LeftSign(this, 40, 710);
        let thiss = this
        this.Character = new Character(this, prevX, prevY, 'gravelwet');

        Fade(this, "In")
        
        if (inventory.has("coin_atlas")) {
            this.Character.setOnCollideWith(this.ConstructionSign, () => {
                this.Character.WalkingSound.stop()
                prevX = 1170
                prevY = 500

                Fade(this, "Out");
                setTimeout(function () {
                    thiss.scene.start("DamnScene_Future");
                }, 1000)
            })
        }

        setTimeout(function() {
            thiss.stateMachine.transition('idle');
        }, 800)

        this.timeTravel = () => {
            console.log("time travel time");
            

            Fade(this, "Out");
            let thiss = this
            setTimeout(function () {
                thiss.Character.WalkingSound.stop();
                prevX = thiss.Character.x;
                prevY = thiss.Character.y;
                thiss.scene.start("CityScene_Present");
            }, 1000)
        }

        this.InventoryGui = new InventoryGui(this);
    }

    update() {
        this.stateMachine.step();
    }
}