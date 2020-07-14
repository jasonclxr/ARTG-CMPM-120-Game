/*
	Time Swapper Sprint 1
    Created by Jason Blecman, Lauren Grubbs, 
        Ethan Michaels for CMPM/ARTG 120 
	Emails: jblecman@ucsc.edu, lgrubbs@ucsc.edu, esmichae@ucsc.edu
	CruzIDs: jblecman, lgrubbs, esmichae

	July 13th, 2020
*/

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
    scene: [CityLevel, WellScene],
    physics: {
        default: "matter",
        matter: {
             debug: false
        }
    }
};

let game = new Phaser.Game(gameConfig);