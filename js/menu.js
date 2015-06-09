var menuState = {
    //by Mauro Flores

	create: function() { 
		game.add.image(0, 0, 'background');

var nameLabel = game.add.text(game.world.centerX, -50, 'Zero Shooter', { font: '70px Geo', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5, 0.5);
game.add.tween(nameLabel).to({y:80}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        var text ='press the up arrow key to start';
        var text2 = 'press the m key to play multiplayer';    
                
var startLabel = game.add.text(game.world.centerX, game.world.height-80, text, {font: '25px Arial', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);
game.add.tween(startLabel).to({angle: -2},500).to({angle: 2},500).loop().start();

var multiLabel = game.add.text(game.world.centerX, game.world.height-100, text2, {font:'25px Arial', fill: '#ffffff'});
multiLabel.anchor.setTo(0.5, 0.5);
game.add.tween(multiLabel).to({angle:-2}, 500).to({angle: 2},500).loop().start();
        
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.addOnce(this.start, this);
        game.input.onDown.addOnce(this.start, this);
        
        var multiKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        multiKey.onDown.addOnce(this.multiplayer, this);
        game.input.onDown.addOnce(this.multiplayer, this);
        
        if (!localStorage.getItem ('bestScore')){
            localStorage.setItem ('bestScore', 0);
        }
        
        if (game.global.score > localStorage.getItem ('bestScore')){
            localStorage.setItem ('bestScore', game.global.score);
        }
        
        
var text = 'score: ' + game.global.score + '\nbest score: ' + localStorage.getItem ('bestScore');
var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
scoreLabel.anchor.setTo(0.5, 0.5);
game.add.tween(scoreLabel).to({angle: -2},500).to({angle: 2},500).loop().start();
        
        this.muteButton = game.add.button (20, 20, 'mute', this.toggleSound, this);
        this.muteButton.input.useHandCursor = true;
        if (game.sound.mute){
            this.muteButton.frame = 1;
        }
	},
    
    toggleSound: function()
    {
      game.sound.mute = ! game.sound.mute;
     this.muteButton.frame = game.sound.mute ? 1: 0;
    },

	start: function() {
		game.state.start('play');	
	},
    
    multiplayer: function(){
        game.state.start ('multiplayer');
    },
        
};