//The character class. This works in tandem with the scenes and the state machine.

class Character extends Phaser.Physics.Matter.Sprite {
    constructor(scene, spawnX, spawnY, sound) {
        super(scene.matter.world, spawnX, spawnY, 'char_atlas', 'CharRight0');

        this.VELOCITY = 3;
        this.JUMP_VELOCITY = -8;
        this.JUMPING = false;
        this.setFriction(0)
        this.setDepth(1)
        scene.add.existing(this);
        scene.keys = scene.input.keyboard.createCursorKeys();
        scene.stateMachine = new StateMachine('time', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            time: new TimeTravelState(),
        }, [scene, this]);
        
        var soundConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.WalkingSound = scene.sound.add(sound, soundConfig);
        this.setScale(0.15, 0.15)

        this.setOnCollideActive(() => {
            this.JUMPING = false;
        })

        this.setOnCollideEnd(() => {
            this.JUMPING = true;
        })
    }
}