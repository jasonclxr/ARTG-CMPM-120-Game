class DamnScene_Present extends Phaser.Scene {
    constructor () {
        super('DamnScene_Present');
    }
    create() {
        let background = this.add.image(0, 0, 'damScene').setOrigin(0, 0);
        background.displayHeight = game.config.height
        background.displayWidth = game.config.width
        this.matter.world.setBounds(0, 0, game.config.width, 525);
        Fade(this, "In")
        let water1 = new DamWater(this, 350, 630);
        water1.visible = pipe1;
        let water2 = new DamWater(this, 590, 630);
        water2.visible = pipe2;
        let water3 = new DamWater(this, 830, 630);
        water3.visible = pipe3;
        let ladder = new Ladder(this, 250, 225)
        ladder.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        ladder.on('pointerdown', () => {
            if (Math.abs(ladder.x - this.Character.x) <= obtainLength*2) {
                if (inventory.has('Rope')) {
                    let ropeLadder = new RopeLadder(this, ladder.x, ladder.y + 50)
                    ropeLadder.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
                    ropeLadder.on('pointerdown', () => {
                        console.log("climbing, insert animation later")
                        this.Character.setPosition(ropeLadder.x + 70, ropeLadder.y-100);
                    })
                    ladder.destroy()
                } else {
                    console.log("you need rope!");
                }
            }
        })


        if (!inventory.has("Screwdriver")) {
            let screwdriver = new Screwdriver(this, 100, 397)
        }
        
        let crank_1 = new Crank(this, 100, 465)
        let crank_2 = new Crank(this, 950, 165)
        let crank_3_broken = this.add.image(450, 325, 'crankBase')
        crank_1.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        crank_2.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        
        crank_3_broken.setScale(0.04)
        crank_3_broken.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });

        crank_3_broken.on('pointerdown', () => {
            if (inventory.has('Crank') && Math.abs(crank_3_broken.x - this.Character.x) <= obtainLength) {
                crank_3_broken.visible = false;
                let crank_3 = new Crank(this, 450, 325)
                crank_3.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
                crank_3.on('pointerdown', () => {
                    if (Math.abs(crank_3.x - this.Character.x) <= 70) {
                        water2.visible = true;
                        pipe2 = true;
                    }
                })
            }
        })

        let pile = new Pile(this, 700, 380);
        let crack = this.add.image(600, 450, 'bigCrack').setScale(0.05);
        this.add.text(game.config.width / 2, 30, 'Dam Scene - Present', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.Character = new Character(this, prevX, prevY);
        this.stateMachine.transition('idle')

        let constructionSign = new ConstructionSign(this, 1100, 530);
        let sapling = new Sapling(this, 1000, 530);
        sapling.setInteractive({ cursor: 'url(./assets/pngs/WellFull.png), pointer' });
        sapling.on('pointerdown', () => {
            if (Math.abs(sapling.x - this.Character.x) <= obtainLength && inventory.has("Bucket")) {
                console.log("Watered tree");
                treeBig = true;
            }
        })

        this.timeTravel = () => {
            console.log("time travel time");
            this.Character.WalkingSound.stop();
            prevX = this.Character.x;
            prevY = this.Character.y;
            this.scene.start("DamnScene_Future");
        }

        crank_1.on('pointerdown', () => {
            if (Math.abs(crank_1.x - this.Character.x) <= obtainLength) {
                if (inventory.has('Oil')&& !pipe1) {
                    water1.visible = true;
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

        let line1 = new Line(this, 520, 94)
        let line2 = new Line(this, 520, 406)
        let line3 = new Line(this, 520, 230)
    }

    update() {
        this.stateMachine.step();
    }
}