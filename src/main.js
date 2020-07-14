'use strict';

let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

var gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    parent: 'game',
    scene: [WellLevel],
    physics: {
        default: "matter",
        matter: {
             debug: true
        }
    }
};

let game = new Phaser.Game(gameConfig);