class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, ground) {
        super(scene, x, y, texture, frame);

        this.VELOCITY = 150;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 1000;
        this.DRAG = 1000;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1000;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.setScale(SCALE);
        scene.physics.add.collider(this, ground);
    }
}

class StateMachine {
    constructor(initialState, possibleStates, stateArgs=[]) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;

        for (const state of Object.values(this.possibleStates)){
            this.StateMachine = this;
        }
    }

    step() {
        if (this.state === null) {
            this.state = this.initialState
            this.possibleStates[this.state].enter(...this.stateArgs);
        }

        this.possibleStates[this.state].execute(...this.stateArgs);
    }

    transition(newState, ...enterArgs) {
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
    }
}

class State {
    enter() {}
    execute() {}
}

class IdleState extends State {
    enter(scene, character) {
        character.body.setVelocityX(0);
        console.log("Character Stopped");
        character.anims.play('idle');
    }

    execute(scene, character) {
        const { left, right, up } = scene.keys;
        if (left.isDown || right.isDown) {
            scene.stateMachine.transition('move');
        }

        if (character.body.touching.down && Phaser.Input.Keyboard.JustDown(up)) {
            scene.stateMachine.transition('jump');
        }
    }
}

class MoveState extends State {
    enter(scene, character) {
        console.log("Character Moving");
    }

    execute(scene, character) {
        const { left, right, up, down} = scene.keys;
        if (left.isDown) {
            character.body.setVelocityX(-character.VELOCITY);
            character.setFlip(true, false);
            character.anims.play('walk', true);
        } else if (right.isDown) {
            character.body.setVelocityX(character.VELOCITY);
            character.resetFlip();
            character.anims.play('walk', true);
        } else {
            scene.stateMachine.transition('idle');
        }

        if (character.body.touching.down && Phaser.Input.Keyboard.JustDown(up)) {
            scene.stateMachine.transition('jump');
        }
    }
}

class JumpState extends State {
    enter(scene, character) {
        console.log("Character Jumped");
        character.body.setVelocityY(character.JUMP_VELOCITY);
    }

    execute(scene, character) {
        const { left, right, up, down } = scene.keys;
        if (left.isDown || right.isDown) {
            scene.stateMachine.transition('move');
        } else {
            scene.stateMachine.transition('idle');
        }
    }
}