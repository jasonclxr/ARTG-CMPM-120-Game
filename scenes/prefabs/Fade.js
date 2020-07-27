//simple function to fade in and out of scenes. couldn't find a wait() function for
//javascript which made it a little bit harder. im used to Lua.

function Fade(scene, inorout) {
    let fade = scene.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0, 0);
    fade.setDepth(2);
    if (inorout == "In") {
        fade.setAlpha(1);
        for (var i = 100; i > 0; i--) {
            let f = i;
            setTimeout(function () {
                fade.setAlpha(1 - f / 100);
            }, i * 10)
        }
    } else {
        fade.setAlpha(0);
        for (var i = 100; i > 0; i--) {
            let f = i;
            setTimeout(function () {
                fade.setAlpha(f / 100);
            }, i * 10)
        } 
    }
}