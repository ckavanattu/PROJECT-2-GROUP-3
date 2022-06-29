import Phaser from 'phaser';
import mountain from "./assets/mountain1.jpg";
import ground from './assets/platform.png';
import diamond from './assets/diamond.png';
import spikeball from './assets/spikeball.png';
import move from './assets/movement.png';
// import revmove from './assets/REVmovement.png';
// import idle from './assets/Idle.png';

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
            frameHeight: 62,
        });

        // this.load.spritesheet("revmove", revmove, {
        //     frameWidth: 32, 
        //     frameHeight: 48,
        // });

        // this.load.spritesheet("Idle", idle, {
        //     frameWidth: 32, 
        //     frameHeight: 62,
        // });
        
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
        this.player = this.physics.add.sprite(100, 450, "movement");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, platforms);
        // animation
        this.anims.create({
            key: "turn",
            frames: [{key:"movement", frame: 2 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames:this.anims.generateFrameNumbers("movement", { start:0, end: 17 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames:this.anims.generateFrameNumbers("movement", { start:17, end: 0 }),
            frameRate: 10,
            repeat: -1,
        });

        const diamonds = this.physics.add.group({
            key: "diamond",
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70 },
        });
        diamonds.children.iterate(function(child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));
        });
        this.physics.add.collider(diamonds, platforms);
        this.physics.add.overlap(this.player, diamonds, collect, null, this);
        function collect(player, diamond) {
            diamond.disableBody(true, true);
        }
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
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
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
            debug: false
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
