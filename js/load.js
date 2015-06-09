var loadState = {
//by Mauro Flores
preload: function(){
    
var loadingLabel = game.add.text (game.world.centerX, 150, 'loading...', {font: '30px Arial', fill: '#ffffff' });
loadingLabel.anchor.setTo(0.5, 0.5);

var progressBar = game.add.sprite (game.world.centerX, 200, 'progressBar');
progressBar.anchor.setTo(0.5, 0.5);
game.load.setPreloadSprite (progressBar);
    
    game.load.spritesheet ('player', 'Assets/ZeroSet.png', 40, 40);
    game.load.spritesheet ('player2', 'Assets/Zero2Set.png', 40, 40);
    game.load.image ('mute', 'Assets/muteButton.png', 28, 22);
    game.load.image ('enemy', 'Assets/PhanteonArm.png');  
    game.load.image ('coin', 'Assets/ZeroLife.png');
    game.load.image ('pixel', 'Assets/ZeroSmallExplosion.png');
    game.load.image ('jumpButton', 'Assets/jumpButton.png');
    game.load.image ('rightButton', 'Assets/rightButton.png');
    game.load.image ('leftButton', 'Assets/leftButton.png');
    game.load.image ('background', 'Assets/background.png');
    game.load.image ('bullet', 'Assets/ZeroBusterShot.png');
    game.load.image ('kaboom', 'Assets/ZeroBigExplosion.png');
    game.load.image ('firingButton', 'Assets/firingButton.png');
    
    this.load.image('tileset', 'Assets/tileset.png');
this.load.tilemap('map', 'Assets/FinalMap.json', null, Phaser.Tilemap.TILED_JSON);
     
    game.load.audio ('jump', ['Assets/jump.ogg','Assets/jump.mp3']);
    game.load.audio ('coin', ['Assets/coin.ogg','Assets/coin.mp3']);
    game.load.audio ('dead', ['Assets/dead.ogg','Assets/dead.mp3']);
    game.load.audio ('bgm', ['Assets/A long night start.mp3']);
    },
    
create: function()    {
        game.state.start('menu');
            }
};