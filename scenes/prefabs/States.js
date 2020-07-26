class TimeTravelState extends State {
    enter(scene, character) {
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        character.anims.play('idle');
        character.WalkingSound.stop()
        //play animation
    }

    execute(scene, character) {
        character.WalkingSound.stop()
    }
}

class IdleState extends State {
    enter(scene, character) {
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        character.anims.play('idle');
        character.WalkingSound.stop()
    }

    execute(scene, character) {
        const { left, right, up, down, space } = scene.keys;
        character.setVelocityX(0);
        character.setAngularVelocity(0,0)
        if (left.isDown || right.isDown) {
            scene.stateMachine.transition('move');
        }
        if (character.JUMPING == false && Phaser.Input.Keyboard.JustDown(up)) {
            scene.stateMachine.transition('jump');
        }
        if (Phaser.Input.Keyboard.JustDown(space) && inventory.has("coin_atlas")) {
            tossCoin(scene, character)

            setTimeout(function () {
                Fade(scene, "Out") 
            }, 800)

            setTimeout(function () {
                scene.timeTravel();
            }, 1600)
        }
    }
}

class MoveState extends State {
    enter(scene, character) {
        character.WalkingSound.play()
    }

    execute(scene, character) {
        const { left, right, up, down, space} = scene.keys;
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

        if (character.JUMPING == false && Phaser.Input.Keyboard.JustDown(up)) {
            scene.stateMachine.transition('jump');
        }
        if (Phaser.Input.Keyboard.JustDown(space) && inventory.has("coin_atlas")) {
            tossCoin(scene, character)

            setTimeout(function () {
                Fade(scene, "Out")
            }, 800)

            setTimeout(function () {
                scene.timeTravel();
            }, 1600)
        }
    }
}

class JumpState extends State {
    enter(scene, character) {
        character.JUMPING = true;
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