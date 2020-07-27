/*
	Time Swapper Sprint 1
    Created by Jason Blecman, Lauren Grubbs, 
        Ethan Michaels for CMPM/ARTG 120 
	Emails: jblecman@ucsc.edu, lgrubbs@ucsc.edu, esmichae@ucsc.edu
	CruzIDs: jblecman, lgrubbs, esmichae

    July 13th, 2020
    
    █▀█ █▀█ █▀█ █▀▀ █▀█ ▄▀█ █▀▄▀█ █▀▄▀█ █▀▀ █▀▄   █▄▄ █▄█
    █▀▀ █▀▄ █▄█ █▄█ █▀▄ █▀█ █░▀░█ █░▀░█ ██▄ █▄▀   █▄█ ░█░

    ░░█ ▄▀█ █▀ █▀█ █▄░█
    █▄█ █▀█ ▄█ █▄█ █░▀█
*/

'use strict';

const SCALE = 0.5;
const tileSize = 35;
const obtainLength = 80

let cursors;
let currentScene = 0;
var prevX = 0;
var prevY = 0;
var pipe1 = false;
var pipe2 = false;
var pipe3 = false;
var gotcrank = false;
var inventory = new Inventory();
var treeBig = false;
var gameConfig = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    parent: 'game',
    scene: [Preload, Menu, CityScene_Present, CityScene_Future, WellScene, DamnScene_Future, DamnScene_Present, EndCredits],
    physics: {
        default: "matter",
        matter: {
             debug: false
        }
    }
};

let game = new Phaser.Game(gameConfig);