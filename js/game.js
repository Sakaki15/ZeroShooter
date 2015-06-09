var game = new Phaser.Game (800, 640, Phaser.AUTO, 'gameDiv');
//by Mauro Flores

game.global ={
    score: 0
    
};
    
    game.state.add ('boot', bootState);
    game.state.add ('load', loadState);
    game.state.add ('menu', menuState);
    game.state.add ('play', playState);
    game.state.add ('multiplayer', multiplayerState);
    

game.state.start ('boot');

