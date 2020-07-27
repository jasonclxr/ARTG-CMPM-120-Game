//this here bad boy is the Damn Scene in the present time. Most of this is conditional checking
//and setting up events for mouse and player interactions.

class DamnScene_Present extends Phaser.Scene {
    constructor () {
        super('DamnScene_Present');
    }
    create() {
        let background = this.add.image(0, 0, 'damScenePresent').setOrigin(0, 0);
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

        let thiss = this
        function ropedLadder() {
            let ropeLadder = new RopeLadder(thiss, ladder.x, ladder.y + 50)
            ropeLadder.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
            ropeLadder.on('pointerdown', () => {
                console.log("climbing, insert animation later")
                this.Character.setPosition(ropeLadder.x + 70, ropeLadder.y - 100);
            })
            roped = true;
            ladder.destroy()
        }

        ladder.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        ladder.on('pointerdown', () => {
            if (Math.abs(ladder.x - thiss.Character.x) <= obtainLength*2) {
                if (inventory.has('rope')) {
                    this.sound.play('rope');
                    ropedLadder()
                } else {
                    console.log("you need rope!");
                }
            }
        })

        if (!roped) {
            ropedLadder()
        }

        if (!inventory.has("screwdriver")) {
            let screwdriver = new Screwdriver(this, 100, 362)
        }
        
        let crank_1 = new Crank(this, 100, 500)
        let crank_2 = new Crank(this, 850, 100)
        let crank_3_broken = this.add.image(450, 300, 'crankBase')
        crank_1.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        crank_2.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        
        crank_3_broken.setScale(0.04)
        crank_3_broken.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });

        crank_3_broken.on('pointerdown', () => {
            if (inventory.has('crankHandle') && Math.abs(crank_3_broken.x - this.Character.x) <= obtainLength) {
                crank_3_broken.visible = false;
                let crank_3 = new Crank(this, 450, 300)
                crank_3.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
                crank_3.on('pointerdown', () => {
                    if (Math.abs(crank_3.x - this.Character.x) <= obtainLength) {
                        water2.visible = true;
                        pipe2 = true;
                    }
                })
            }
        })

        this.add.text(game.config.width / 2, 30, 'Dam Scene - Present', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.Character = new Character(this, prevX, prevY, 'graveldry');
        this.stateMachine.transition('idle')

        let constructionSign = new ConstructionSign(this, 1100, 560);
        let sapling = new Sapling(this, 1000, 560);
        sapling.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        sapling.on('pointerdown', () => {
            if (Math.abs(sapling.x - this.Character.x) <= obtainLength && inventory.has("fullbucket")) {
                console.log("Watered tree");
                this.sound.play('bucket');
                inventory.remove(this, 'fullbucket');
                treeBig = true;
            }
        })

        this.timeTravel = () => {
            console.log("time travel time");

            Fade(this, "Out");
            let thiss = this
            setTimeout(function () {
                prevX = this.Character.x;
                prevY = this.Character.y;
                this.Character.WalkingSound.stop();
                thiss.scene.start("DamnScene_Future");
            }, 1000)
        }

        crank_1.on('pointerdown', () => {
            if (Math.abs(crank_1.x - this.Character.x) <= obtainLength) {
                if (inventory.has('oil') && !pipe1) {
                    water1.visible = true;
                    inventory.remove(this, "oil");
                    pipe1 = true;
                } else {
                    console.log("you need oil!")
                }
            }
        })

        crank_2.on('pointerdown', () => {
            if (Math.abs(crank_2.x - this.Character.x) <= obtainLength) {
                water3.visible = true;
                pipe3 = true;
            }
        })

        let line1 = new Line(this, 260, 163)
        line1.displayWidth = 540
        let line1_2 = new Line(this, 810, 163)
        line1_2.displayWidth = 265
        let line2 = new Line(this, 460, 370)
        
        this.InventoryGui = new InventoryGui(this);
    }

    update() {
        this.stateMachine.step();

        if (pipe1 && pipe2 && pipe3) {
            setTimeout(() => {
                this.scene.start('EndCredits')
            }, 1000)
        }
    }
}