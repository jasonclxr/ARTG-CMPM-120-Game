'use strict';

let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

let gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: [load, testScene],
    title: "CMPM 120/ARTG120 Game",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        } 
    }
}

let game = new Phaser.Game(gameConfig);