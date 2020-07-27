//menu scene. this is very basic, just reseting preexisting values and directing the player.

class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    create() {
        let presentBackground = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        presentBackground.displayHeight = game.config.height
        presentBackground.displayWidth = game.config.width

        this.MenuText = this.add.text(game.config.width / 2, game.config.height / 2, 'PRESS UP TO PLAY\n\nPRESS DOWN FOR CONTROLS', { align: 'center', font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        this.ControlsText = this.add.text(game.config.width / 2, game.config.height / 2, 'CONTROLS\nLeft/Right Arrow for movement\nUp arrow for moving\nSpace for time travel\n\n\n\nPRESS DOWN TO RETURN TO MENU', { align: 'center', font: '30px Arial', fill: '#FFFFFF' }).setOrigin(0.5);
        
        this.ControlsText.visible = false
    }

    update() {
        const { left, right, up, down, space } = this.input.keyboard.createCursorKeys();
        if (Phaser.Input.Keyboard.JustDown(up)) {
            cursors = undefined;
            currentScene = 0;
            prevX = game.config.width / 10
            prevY = game.config.height - 100
            pipe1 = false;
            pipe2 = false;
            pipe3 = false;
            gotcrank = false;
            inventory = new Inventory();
            treeBig = false;
            roped = false;
            
            this.scene.start("CityScene_Present");
        }

        if (Phaser.Input.Keyboard.JustDown(down)) {
            this.MenuText.visible = !this.MenuText.visible
            this.ControlsText.visible = !this.ControlsText.visible
        }
    }

}