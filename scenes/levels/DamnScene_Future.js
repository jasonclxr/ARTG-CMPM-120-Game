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

        let water1 = new DamWater(this, 120, 730);
        water1.visible = pipe1;
        let water2 = new DamWater(this, 340, 730);
        water2.visible = pipe2;
        let water3 = new DamWater(this, 560, 730);
        water3.visible = pipe3;
        let ladder = new Ladder(this, 250, 175)
        let crank_1 = new Crank(this, 100, 500)
        let crank_2 = new Crank(this, 850, 100)
        let crank_3 = new Crank(this, 450, 300)
        crank_1.setInteractive();
        crank_2.setInteractive();
        crank_3.setInteractive();

        crank_3.on('pointerdown', () => {
            if (Math.abs(crank_3.x - this.Character.x) <= obtainLength) {
                if (inventory.has('Screwdriver')) {
                    inventory.add('Crank');
                    crank_3.destroy();
                }
            }
        })

        let crack = new Crack(this, 600, 500);

        this.add.text(game.config.width / 2, 30, 'Dam Scene - Future', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.Character = new Character(this, prevX, prevY);
        this.stateMachine.transition('idle')

        let water4 = new DamWater(this, 630, 530);
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
            this.Character.WalkingSound.stop();
            prevX = this.Character.x;
            prevY = this.Character.y;
            this.scene.start("DamnScene_Present");
        }

        if (!inventory.has('Oil')) {
            let oil = new Oil(this, 175, 555)
        }

        let line1 = new Line(this, 260, 163)
        line1.displayWidth = 540
        let line1_2 = new Line(this, 810, 163)
        line1_2.displayWidth = 265
        let line2 = new Line(this, 460, 370)
    }

    update() {
        this.stateMachine.step();
    }
}