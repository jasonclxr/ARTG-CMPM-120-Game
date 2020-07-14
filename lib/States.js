class Character extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame, ground) {
        super(scene.matter.world, x, y, texture, frame);

        this.VELOCITY = 5;
        this.JUMP_VELOCITY = -5;
        scene.add.existing(this);
        this.setScale(SCALE);
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
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        character.anims.play('idle');
    }

    execute(scene, character) {
        const { left, right, up } = scene.keys;
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        if (left.isDown || right.isDown) {
            scene.stateMachine.transition('move');
        }
    }
}

class MoveState extends State {
    enter(scene, character) {

    }

    execute(scene, character) {
        const { left, right, up, down} = scene.keys;
        if (left.isDown) {
            character.setVelocityX(-character.VELOCITY);
            character.setAngularVelocity(0,0)
            character.setFlip(true, false);
            character.anims.play('walk', true);
        } else if (right.isDown) {
            character.setVelocityX(character.VELOCITY, 0);
            character.setAngularVelocity(0,0)
            character.resetFlip();
            character.anims.play('walk', true);
        } else {
            scene.stateMachine.transition('idle');
        }
    }
}

class JumpState extends State {
    enter(scene, character) {
        character.setVelocity(character.body.velocity.x, character.JUMP_VELOCITY);
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