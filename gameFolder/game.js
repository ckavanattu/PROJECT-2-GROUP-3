const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update, update
})

function preload () {
    game.load.image('mountain', 'assets/mountain.jpg')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('gem', 'assets/gem.png')
    game.load.spritesheet('idle,run,jump_sheet.png', 32, 32)
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
    
    


    if (game.sound.usingWebAudio &&
        game.sound.context.state === 'suspended')
    {
      game.input.onTap.addOnce(game.sound.context.resume, game.sound.context);
    }
}
function update () {}