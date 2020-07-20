class WellScene extends Phaser.Scene {
    constructor() {
        super('WellScene');
    }

    create() {
        let background = this.add.image(0, 0, 'wellbackground').setOrigin(0, 0) ;
        background.displayHeight = game.config.height
        background.displayWidth = game.config.width
        this.matter.world.setBounds(270, 0, 260, game.config.height*0.95);

        this.add.text(game.config.width / 2, 30, 'Initial City Level: Well Scene', { font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.keys = this.input.keyboard.createCursorKeys();

        this.Character = new Character(this, game.config.width / 2, game.config.height/10);
        this.Character.setScale(0.2,0.2)

        Fade(this, "In")
        let thiss = this
        setTimeout(function() {
            thiss.sound.play('splash');
            thiss.stateMachine.transition('idle');
        }, 1200)
    }

    update() {
        this.stateMachine.step();
    }
}