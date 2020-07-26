function tossCoin(scene, character) {
    let current = character.y
    let image = scene.add.sprite(character.x + 25, current, 'coin_atlas', 'Coin10')
    image.setScale(SCALE/5)
    image.anims.play('coinflip');
    for (let i = 0; i < 80; i++) {
        setTimeout(function () {
            image.setPosition(image.x, --current)
        }, i * 10)
    }
    for (let i = 0; i < 80; i++) {
        setTimeout(function () {
            image.setPosition(image.x, ++current)
        }, 1000+ i * 10)
    }
}