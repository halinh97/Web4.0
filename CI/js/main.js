var Nakama = {};
//thay mot gia trij nao do
Nakama.configs = {
  SHIP_SPEED : 200,
  BULLET_SPEED : 1500
}
window.onload = function(){
  Nakama.game = new Phaser.Game(
    640,
    960,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    },
    false,
    false
  );
};
var preload = function()
	{
		  Nakama.game.scale.minWidth = 320;
		  Nakama.game.scale.minHeight = 480;
		  Nakama.game.scale.maxWidth = 640;
		  Nakama.game.scale.maxHeight = 960;
		  Nakama.game.scale.pageAlignHorizontally = true;
		  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		  //load anh
		  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
		  Nakama.game.load.image('background', 'Assets/Map1.png');

		  Nakama.game.time.advancedTiming = true;
		}
	// khoi tao game
	var create = function()
	{
		  //trong luc ,va cham...tong luc ..
		  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
		  Nakama.keyboard = Nakama.game.input.keyboard;
		  //at map vao
		   Nakama.mapstart= Nakama.game.add.tileSprite(0, 0, 640, 960, 'background');

		  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
		  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
		  Nakama.playerGroup = Nakama.game.add.physicsGroup();
		  Nakama.shipControllers = [];

		  var player1 = new ShipController(200,800,"Spaceship2-Player.png",{
		    up       : Phaser.Keyboard.UP,
		    down     : Phaser.Keyboard.DOWN,
		    left     : Phaser.Keyboard.LEFT,
		    right    : Phaser.Keyboard.RIGHT,
		    fire     : Phaser.Keyboard.SPACEBAR,
		    cooldown : 0.085
		  });
		  Nakama.shipControllers.push(player1);
		  var player2 = new ShipController(400,800,"Spaceship2-Partner.png",{
		    up      : Phaser.Keyboard.W,
		    down    : Phaser.Keyboard.S,
		    left    : Phaser.Keyboard.A,
		    right   : Phaser.Keyboard.D,
		    fire    : Phaser.Keyboard.SHIFT,
		    cooldown: 0.085

		  });
		  Nakama.shipControllers.push(player2);
		  Nakama.EnemyControllers = [];
		  var enemy1 = new EnemyController(300,200,"EnemyType1.png",{health:100});
		  Nakama.EnemyControllers.push(enemy1);
		  var enemy2 = new EnemyController(150,100,"EnemyType2.png",{health:50});
		  Nakama.EnemyControllers.push(enemy2);
		  var enemy3 = new EnemyController(450,100,"EnemyType3.png",{health:80});
		  Nakama.EnemyControllers.push(enemy3);
		  // var enemy = Nakama.enemyGroup.create( 320, 100,"assets","EnemyType1.png");enemy.health = 200;
		}
	var update = function()
	{
		  Nakama.mapstart.tilePosition.y += 5;//toc do tau
		  for(var i = 0;i<Nakama.shipControllers.length;i++){
		    Nakama.shipControllers[i].update();
		  }
		  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup,Nakama.enemyGroup,onBulletHitActor);
		}

	function onBulletHitActor(bulletSprite,actorSprite){
		 actorSprite.damage(1);
		 bulletSprite.kill();
		 }


		var render = function(){}
