const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update, update
})

let platforms
let player 
let gems
let cursors
let score = 0
let scoreText

function preload () {
    game.load.image('mountain', 'assets/mountain.jpg')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('gem', 'assets/gem.png')
    game.load.spritesheet('idle,run,jump_sheet', 'idle,run,jump_sheet.png', 32, 32)
}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'mountain')

    platforms = game.add.group()
    platforms.enableBody = true

    let ground = platform.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(2,2)
    ground.body.immovable = true

    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true
    
    player = game.add.sprite(32, game.world.height - 150, 'idle,run,jump_sheet')
    game.physics.ARCADE.enable(player)
    player.body.bounce.y = 0.2
    player.body.gravity.y = 800
    player.body.collideWorldBounds = true
    
    player.animations.add('left' [10, 11], 10, true)\
    player.animations.add('left', [15, 18], 10, true)

    gems = game.add.group()
    gems.enableBody = true

    for (var i = 0; i < 12; i++) {
        let gem = gems.create(i * 70, 0, 'gem')
        gem.body.gravity.y = 1000
        gem.body.bounce.y = 0.3 + Math.random() * 0.2
    }

    scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000'})
    cursors = game.input.keyboard.createCursorKeys()


}
function update () {
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(gems, platforms)
    game.physics.arcade.overlap(player, gems, collectGem, null, this)

    player.body.velocity.x = 0

    if (cursors.left.isDown) {
        player.body.velocity.x = -150
        player.animations.play('left')
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150
        player.animations.play('right')
    } else {
        platforms.animations,stop()
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -400
    }
}

function collectGem (player, gem) {
    gem.kill()

    score += 10
    scoreText.text = 'Score' + score
}

    if (game.sound.usingWebAudio &&
        game.sound.context.state === 'suspended')
    {
      game.input.onTap.addOnce(game.sound.context.resume, game.sound.context);
    }