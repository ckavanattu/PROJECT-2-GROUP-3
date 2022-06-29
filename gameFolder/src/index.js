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
        
        this.load.spritesheet("move", move, {
            frameWidth: 32, 
            frameHeight: 62,
        });

        this.load.spritesheet("revmove", revmove, {
            frameWidth: 32, 
            frameHeight: 48,
        });
        
    }
      
    create ()
    {
        this.add.image(400, 300, "mountain");

        const platforms = this.physics.add.staticGroup();
        // platforms
        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        platforms.create(900, 350, "ground")
        platforms.create(25, 295, "ground")
        platforms.create(550, 220, "ground")
        platforms.create(-120, 150, "ground")
        platforms.create(600, 450, "ground")
        this.player = this.physics.add.sprite(100, 450, "move");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, platforms);
        // animation
        this.anims.create({
            key: "turn",
            frames: [{key:"movement", frame: 12 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames:this.anims.generateFrameNumbers("movement", { start:10, end: 16 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames:this.anims.generateFrameNumbers("REVmovement", { start:6, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update ()
    {
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        }
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
