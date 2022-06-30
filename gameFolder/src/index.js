import Phaser from "phaser";
import mountain from "./assets/mountain1.jpg";
import ground from "./assets/platform.png";
import diamond from "./assets/diamond.png";
import spikeball from "./assets/spikeball.png";
import move from "./assets/movement.png";
// import revmove from './assets/REVmovement.png';
// import idle from './assets/Idle.png';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("mountain", mountain);
    this.load.image("ground", ground);
    this.load.image("diamond", diamond);
    this.load.image("spikeball", spikeball, {
      frameWidth: 32,
      frameHeight: 32,
    });

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

  create() {
    this.add.image(400, 300, "mountain");

    const platforms = this.physics.add.staticGroup();
    // platforms
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(900, 350, "ground");
    platforms.create(25, 295, "ground");
    platforms.create(550, 220, "ground");
    platforms.create(-120, 150, "ground");
    platforms.create(600, 450, "ground");

    this.player = this.physics.add.sprite(100, 450, "movement");
    this.player.setSize(20, 40, true);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platforms);
    // animation
    this.anims.create({
      key: "turn",
      frames: [{ key: "movement", frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNames("movement", { start: 10, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNames("movement", { start: 17, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    // diamonds
    const diamonds = this.physics.add.group({
      key: "diamond",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 68 },
    });
    diamonds.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(diamonds, platforms);
    this.physics.add.overlap(this.player, diamonds, collect, null, this);

    // spikeballs
    const spikeballs = this.physics.add.group();

    this.physics.add.collider(spikeballs, platforms);

    this.physics.add.collider(
      this.player,
      spikeballs,
      spikeballTouched,
      null,
      this
    );

    function spikeballTouched(player, spikeball) {
      this.physics.pause();
      this.player.setTint(0xff000);
      this.player.anims.play("turn");
    }

    // score text
    const scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
    let score = 0;

    // diamonds collision
    function collect(player, diamond) {
      diamond.disableBody(true, true);
      score += 10;
      scoreText.setText("Score: " + score);

      if (diamonds.countActive(true) === 0) {
        diamonds.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });

        var x =
          player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);

        const spikeball = spikeballs.create(x, 16, "spikeball");
        spikeball.setBounce(1);
        spikeball.setCollideWorldBounds(true);
        spikeball.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }
  }

  update() {
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
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 450 },
      debug: false,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
