
class EndCredits extends Phaser.Scene {
    constructor() {
        super("EndCredits");
    }

    create() {
        this.background = this.add.image(0, 0, 'endCredit1').setOrigin(0, 0);
        this.background.displayHeight = game.config.height
        this.background.displayWidth = game.config.width

        this.credits = this.add.image(0, 0, 'endCredit2').setOrigin(0, 0);
        this.credits.displayHeight = game.config.height
        this.credits.displayWidth = game.config.width
        this.credits.visible = false

        this.controls = this.input.keyboard.createCursorKeys();
    }

    update() {
        let { left, right, up, down, space } = this.controls
        let justDownCheck = Phaser.Input.Keyboard.JustDown(space)
        if (justDownCheck && this.background.visible) {
            this.background.visible = false
            this.credits.visible = true
        } else if (justDownCheck && this.credits.visible) {
            console.log(2)
            this.scene.start("Menu");
        }
    }

}