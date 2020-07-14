class TimeTravelState extends State {
    enter(scene, character) {
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        character.anims.play('idle');
        scene.walkingSound.stop()
        //play animation
    }

    execute(scene, character) {

    }
}

class IdleState extends State {
    enter(scene, character) {
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        character.anims.play('idle');
        scene.walkingSound.stop()
    }

    execute(scene, character) {
        const { left, right, up } = scene.keys;
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        if (left.isDown || right.isDown) {
            scene.stateMachine.transition('move');
        }
        if (character.onGround == true && Phaser.Input.Keyboard.JustDown(up)) {
            scene.stateMachine.transition('jump');
        }
    }
}

class MoveState extends State {
    enter(scene, character) {
        scene.walkingSound.play()
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

        if (character.onGround == true && Phaser.Input.Keyboard.JustDown(up)) {
            scene.stateMachine.transition('jump');
        }
    }
}

class JumpState extends State {
    enter(scene, character) {
        console.log("jumping");
        character.onGround = false;
        character.setVelocityY(character.JUMP_VELOCITY);
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