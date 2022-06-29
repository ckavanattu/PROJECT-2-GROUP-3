import Phaser from 'phaser';
import mountain from "./assets/mountain1.jpg";
import ground from './assets/platform.png';
import diamond from './assets/diamond_big.png';
import spikeball from './assets/spikeball.png';
import move from './assets/movement.png';
import revmove from './assets/REVmovement.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image("mountain", mountain);
        this.load.image("ground", ground);
        this.load.image("diamond", diamond);
        this.load.image("spikeball", spikeball);
        
        this.load.spritesheet("movement", move, {
            frameWidth: 32, 
            frameHeight: 48,
        });

        this.load.spritesheet("movement", revmove, {
            frameWidth: 32, 
            frameHeight: 48,
        });
        
    }
      
    create ()
    {
        this.add.image(400, 300, "mountain");
        mountain.scale = 0.5;


    }

    resize (width, height) {
        this.cameras.resize(width, height);
        this.mountain.setDisplaySize(width, height);
        
    }

    update ()
    {

    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 450},
            debug: true
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
