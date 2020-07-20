class Character extends Phaser.Physics.Matter.Sprite {
    constructor(scene, spawnX, spawnY) {
        super(scene.matter.world, spawnX, spawnY, 'char_atlas', 'CharRight0');

        this.VELOCITY = 4;
        this.JUMP_VELOCITY = 4;
        scene.add.existing(this);
        this.setScale(SCALE);

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
        this.WalkingSound = scene.sound.add('gravelwet', soundConfig);
        this.setScale(0.2, 0.2)
    }
}