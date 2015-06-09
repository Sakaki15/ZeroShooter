var playState = {
      //by Mauro Flores
create: function(){
    
    this.setupBullets();
    this.setupExplosions();
    this.setupPlayer();
    this.setupEnemies();
    this.setupParticles();
    this.setupMusic();
    this.setupLabels();
    
this.cursor = game.input.keyboard.createCursorKeys();
    
    this.createWorld();
          if (!game.device.desktop){
          this.addMobileInputs(); }
    
    this.coin = game.add.sprite(130, 50, 'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5); 

        game.global.score = 0;

            this.wasd = {
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            fire: game.input.keyboard.addKey(Phaser.Keyboard.F)   };
    
    this.nextEnemy = 0;  
    
     },
    
    update: function() {
		
        game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.enemyPool, this.layer);
game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
game.physics.arcade.overlap(this.bulletPool, this.enemyPool, this.hitEnemy, null, this);
        if (game.global.lives > 0){
game.physics.arcade.overlap(this.player, this.enemyPool, this.playerDie, null, this);}
        
        if (game.global.lives === 0){
        this.music.stop();
        game.time.events.add(900, this.startMenu, this);}
        
		this.movePlayer();
game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
	  
         if (!this.player.inWorld) {
			this.playerDie();}
        
        this.coin.angle += 1; //Rotate coins
                
        if (this.nextEnemy < game.time.now){
        var start = 4000, end = 4000, score = 100;
        var delay = Math.max (start - (start-end) * game.global.score/score, end);
            this.addEnemy();
            this.nextEnemy = game.time.now + delay;
            this.enemyPool.forEachAlive(this.checkPosition, this);
            this.enemyPool.forEachAlive(this.checkPosition, this);}           
	},
    
    checkPosition: function (enemy){
        if (enemy.y > this.player.Y){
        enemy.kill();        }
},
    
    setupMusic: function(){
    this.jumpSound = game.add.audio('jump');
          this.coinSound = game.add.audio('coin');
          this.deadSound = game.add.audio('dead');
          this.music = game.add.audio('bgm');
        this.music.play('', 0, 1, true);
        this.music.onLoop.add(this.loopMusic, this);
          },
    
    loopMusic: function(){
        this.music.play('', 0, 1, true);
    },
    
    setupLabels: function(){
this.lifeLabel = game.add.text (60, 60, 'lives: 5', {font: '20px Arial', fill: '#ffffff'});
game.global.lives = 5;
this.scoreLabel = game.add.text(30, 30, 'score: 0', {font: '18px Arial', fill: '#ffffff'});
    },
    
    setupParticles: function(){
     this.emitter = game.add.emitter (0, 0, 15);
          this.emitter.makeParticles('pixel');
          this.emitter.setYSpeed(150, -150);
          this.emitter.setXSpeed(150, -150);
          this.emitter.gravity = 0;
    },
    
        movePlayer: function() {
    
        if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft) {
			this.player.body.velocity.x = -200;
            this.player.animations.add('run');
            this.player.animations.play ('run', 5, true);
            this.player.animations.play('left');
        }
else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight) {
            this.player.body.velocity.x = 200;
            this.player.animations.add('run');
            this.player.animations.play ('run', 5, true);
            this.player.animations.play('right');   
}
		else {
			this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 0;}
    
if (this.cursor.up.isDown || this.wasd.up.isDown) { 
  this.jumpPlayer();  }
            
if (this.input.keyboard.isDown (Phaser.Keyboard.SPACEBAR)){
            this.fireBullet(); }
	},
    
    hitEnemy: function(bullet, enemy){
    bullet.kill();
        this.explode(enemy);
    },
      
    jumpPlayer: function(){
        if (this.player.body.onFloor()){
        this.player.body.velocity.y = -320;
    this.jumpSound.play();
    this.jumpSound.volume = 0.5;}
         },
    
    setupPlayer: function(){
this.player = this.add.sprite (game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;
        this.player.animations.add('right', [1], 10);
		this.player.animations.add('left', [0], 10);
                 
             },
        
    setupBullets: function(){
    this.nextShotAt = 0;
this.shotDelay = 100;
     this.bulletPool = this.add.group();
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bulletPool.createMultiple(3, 'bullet');
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);
this.bulletPool.forEach(function(bulletPool){
     bulletPool.alive = true;}, this, false) },
         
    setupExplosions: function(){
this.explosions = game.add.group();
this.explosions.enableBody = true;
this.explosions.createMultiple(2, 'kaboom');
this.explosions.setAll('anchor.x', 0.5);
this.explosions.setAll('anchor.y', 0.5);
this.explosions.forEach(function(explosion){explosion.animations.add('boom');}); 
},
    
    setupEnemies: function(){
    this.enemyPool = game.add.group();
        this.enemyPool.enableBody = true;
        this.enemyPool.createMultiple(10, 'enemy'); 
},
    
    explode: function(enemy){
        if (this.explosions.countDead() === 0) {
       return;
     }
         var explosion = this.explosions.getFirstExists(false); 
    if (explosion){
    explosion.reset(enemy.x, enemy.y);
     explosion.play('boom', 2, false, true);
      explosion.body.velocity.x = enemy.body.velocity.x;
     explosion.body.velocity.y = enemy.body.velocity.y;
        enemy.alive = false;
        enemy.destroy();
    }
     },

fireBullet: function(){
    
    if (game.time.now > this.nextShotAt){
   var bullet; 
bullet = this.bulletPool.getFirstExists(false);      
    }
    
   if (bullet){
bullet.reset(this.player.x, this.player.y); 
    bullet.body.velocity.x = -200;
      }
    },
    
    takeCoin: function(player, coin){
          this.coinSound.play();
        this.coin.scale.setTo(0, 0);
        game.add.tween(this.coin.scale).to({x:1, y:1}, 300).start();
game.add.tween(this.player.scale).to({x:1.3, y:1.3}, 50).to({x:1, y:1}, 150).start();
        game.global.score += 5;
        this.scoreLabel.text = 'score: ' + game.global.score;  
        this.updateCoinPosition();
    },
    
    updateCoinPosition: function() {
		var coinPosition = [
			{x: 250, y: 40}, {x: 310, y: 40}, 
			{x: 400, y: 40}, {x: 440, y: 90}, 
			{x: 450, y: 40}, {x: 610, y: 160},
            {x: 350, y: 270}, {x: 530, y: 210},
            {x: 600, y: 300}, {x: 680, y: 395},
            {x: 500, y:40}, {x: 190, y: 310}
            
		];

		for (var i = 0; i < coinPosition.length; i++) {
			if (coinPosition[i].x === this.coin.x) {
				coinPosition.splice(i, 1);	}
		}

var newPosition = coinPosition[game.rnd.integerInRange(0, coinPosition.length-1)];
		this.coin.reset(newPosition.x, newPosition.y);
	},
	
    addEnemy: function() {
		var enemy = this.enemyPool.getFirstDead();
		if (!enemy) {
			return;}
        enemy.anchor.setTo(0.5, 1);
		enemy.reset(game.world.centerX, 0);
		enemy.body.gravity.y = 500;
		enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
		enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	},

	createWorld: function() {
		this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        this.map.setCollision(1); 
	},
    
    playerDie: function() {
        if (!this.player.alive){
            return;
        }
    
    this.player.kill();
    this.deadSound.play();    
    this.emitter.x = this.player.y;
    this.emitter.y = this.player.x;
    this.emitter.start(true, 600, null, 15);
    game.global.lives -= 1; 
    this.lifeLabel.text = 'lives: ' + game.global.lives;          
    this.enemyPool.alive = false;
        this.enemyPool.destroy();
        this.setupEnemies();
        this.player.reset(game.world.centerX, game.world.centerY);
    },
    
    startMenu: function(){
        game.state.start('menu');
    },
};