class testScene extends Phaser.Scene {
    constructor() {
        super('testScene');
    }

    create() {
        this.ACCELERATION = 100;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 1000;
        this.DRAG = 1000;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1000;
        this.physics.world.gravity.y = 3000;
        console.log("testScene created");
        this.cameras.main.setBackgroundColor('#227B96');

        cursors = this.input.keyboard.createCursorKeys();

        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.alien = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'platformer_atlas', 'front').setScale(SCALE);
        this.alien.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.physics.add.collider(this.alien, this.ground);
        this.add.text(game.config.width / 2, 30, 'This is a sample scene.', { font: '30px Source Sans', fill: '#FFFFFF' }).setOrigin(0.5);
        
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_atlas', {
                prefix: 'walk',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            defaultTextureKey: 'platformer_atlas',
            frames: [
                { frame: 'front' }
            ],
            repeat: -1
        });
        // won't need this for now, but we're taking care of it for a future scene
        this.anims.create({
            key: 'jump',
            defaultTextureKey: 'platformer_atlas',
            frames: [
                { frame: 'jump' }
            ],
        });
   
    }

    update() {
        if (cursors.left.isDown) {
            this.alien.body.setAccelerationX(-this.ACCELERATION);
            this.alien.setFlip(true, false);
            this.alien.anims.play('walk', true);
        } else if (cursors.right.isDown) {
            this.alien.body.setAccelerationX(this.ACCELERATION);
            this.alien.resetFlip();
            this.alien.anims.play('walk', true);
        } else {
            this.alien.body.setAccelerationX(0);
            this.alien.body.setDragX(this.DRAG);
            this.alien.anims.play('idle');
        }

        // jump
        if (!this.alien.body.touching.down) {
            this.alien.anims.play('jump', true);
        }
        // use JustDown to avoid 'pogo' jumps if you player keeps the up key held down
        // note: there is unfortunately no .justDown property in Phaser's cursor object
        if (this.alien.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            console.log("jumped!");
            this.alien.body.setVelocityY(this.JUMP_VELOCITY);
        } else {
            console.log("jump failed");
        }

        this.physics.world.wrap(this.alien, this.alien.width / 2);
    }
}