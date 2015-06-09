var bootState = {
//by Mauro Flores
preload: function() {
game.load.image ('progressBar', 'Assets/progressBar.png'); 
},
    
create: function() {
            game.stage.backgroundColor = '#3498db';
    game.physics.startSystem(Phaser.Physics.ARCADE);
         
    if(!game.device.desktop){
    
    game.scale.scaleMode = Phaser.ScaleManagaer.SHOW_ALL;
    document.body.style.backgroundColor = '#3498db';
        
        game.scale.minWidth = 900;
        game.scale.minHeight = 770;
        game.scale.maxWidth = 1200;
        game.scale.maxHeight = 950;
        
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setScreenSize (true);
    }
    game.state.start ('load');
    }

};