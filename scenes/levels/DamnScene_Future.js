//this here bad boy is the Damn Scene in the future time. Most of this is conditional checking
//and setting up events for mouse and player interactions.

class DamnScene_Future extends Phaser.Scene {
    constructor () {
        super('DamnScene_Future');
    }
    create() {
        let background = this.add.image(0, 0, 'damSceneFuture').setOrigin(0, 0);
        background.displayHeight = game.config.height
        background.displayWidth = game.config.width
        this.matter.world.setBounds(0, 0, game.config.width, 575);
        Fade(this, "In")
        let water1 = new DamWater(this, 150, 750);
        water1.visible = pipe1;
        let water2 = new DamWater(this, 365, 750);
        water2.visible = pipe2;
        let water3 = new DamWater(this, 585, 750);
        water3.visible = pipe3;
        let ladder = new Ladder(this, 250, 175)
        let crank_1 = new Crank(this, 100, 500)
        let crank_2 = new Crank(this, 850, 100)

        if (!pipe1) {
            let crack1 = new Crack(this, 800, 160);
            crack1.setScale(0.04)
        }

        if (!pipe2) {
            let crack2 = new Crack(this, 600, 200);
            crack2.setScale(0.04)
        }

        if (!gotcrank) {
            let crank_3 = new Crank(this, 450, 300)
            crank_3.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
            crank_3.on('pointerdown', () => {
                if (Math.abs(crank_3.x - this.Character.x) <= obtainLength) {
                    if (inventory.has('screwdriver')) {
                        inventory.add(this, 'crankHandle');
                        gotcrank = true;
                        this.sound.play('screwdriver');
                        inventory.remove(this, 'screwdriver')
                        crank_3.destroy();
                    }
                } else {
                    this.sound.play('too_far_away')
                }
            })
        }

        let crack = new Crack(this, 600, 500);
        this.add.text(game.config.width / 2, 30, 'Dam Scene - Future', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.Character = new Character(this, prevX, prevY, 'gravelwet');
        this.stateMachine.transition('idle')

        let water4 = this.add.image(630, 530, 'water');
        water4.setScale(0.15)
        
        let sapling = new Sapling(this, 1000, 560);
        if (treeBig == true) {
            let tree = new BigTree(this, sapling.x, sapling.y - 50)
            sapling.destroy()
            let constructionSign = new SolidConstructionSign(this, 1100, 560);
        } else {
            let constructionSign = new ConstructionSign(this, 1100, 560);
        }
        this.timeTravel = () => {
            console.log("time travel time");

            Fade(this, "Out");
            let thiss = this
            setTimeout(function () {
                thiss.Character.WalkingSound.stop();
                prevX = thiss.Character.x;
                prevY = thiss.Character.y;
                thiss.scene.start("DamnScene_Present");
            }, 1000)
            
        }

        if (!inventory.has('oil')) {
            let oil = new Oil(this, 175, 555)
        }

        let line1 = new Line(this, 460, 163)
        let line2 = new Line(this, 460, 370)
        this.InventoryGui = new InventoryGui(this);
    }

    update() {
        this.stateMachine.step();
    }
}