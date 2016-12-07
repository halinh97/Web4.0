var Nakama = {};
//thay mot gia trij nao do
Nakama.configs = {
  SHIP_SPEED : 200,
  BULLET_SPEED : 1500,
  PLAYER_TYPE : {
    PLAYER_1 :true,
    PLAYER_2 :false
  }

}
window.onload = function(){
  Nakama.configs.SHIP_TYPE ={
   SHIP_TYPE_1 : ShipType1Controller,
   SHIP_TYPE_2 : ShipType2Controller,
   SHIP_TYPE_3 : ShipType3Controller

 },
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
  Nakama.mapstart = Nakama.game.add.tileSprite(0, 0, 640, 960, 'background');

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup  = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();
  Nakama.shipControllers = [];

  var player1Constructor = getPlayerShipChoice("player1");
  var player2Constructor = getPlayerShipChoice("player2");

  var player1 = new player1Constructor(200,800,Nakama.configs.PLAYER_TYPE.PLAYER_1,{
    up       : Phaser.Keyboard.UP,
    down     : Phaser.Keyboard.DOWN,
    left     : Phaser.Keyboard.LEFT,
    right    : Phaser.Keyboard.RIGHT,
    fire     : Phaser.Keyboard.SPACEBAR
  });
  Nakama.shipControllers.push(player1);
  var player2 = new player2Constructor(400,800,Nakama.configs.PLAYER_TYPE.PLAYER_2,{
    up      : Phaser.Keyboard.W,
    down    : Phaser.Keyboard.S,
    left    : Phaser.Keyboard.A,
    right   : Phaser.Keyboard.D,
    fire    : Phaser.Keyboard.SHIFT
  });
  Nakama.shipControllers.push(player2);
  var enemy  = new EnemyController(new Phaser.Point(320,100),"EnemyType1.png",{health:200});
  var enemy1 = new EnemyController(new Phaser.Point(200,100),"EnemyType3.png",{health:350});
  var enemy2 = new EnemyController(new Phaser.Point(450,100),"EnemyType2.png",{health:300});
  var enemy3 = new EnemyController(new Phaser.Point(320,200),"EnemyType4Base.png",{health:400});
}

var update = function()
{
  Nakama.mapstart.tilePosition.y += 5;
  for(var i = 0;i<Nakama.shipControllers.length;i++){
    Nakama.shipControllers[i].update();
  }

  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup,Nakama.enemyGroup,onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.playerGroup, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.enemyGroup, Nakama.playerGroup, onBulletHitActor);
}

function onBulletHitActor(bulletSprite,actorSprite){
  actorSprite.damage(bulletSprite.power);
  bulletSprite.kill();
}


function getPlayerShipChoice(playerName){
  var playerChoice = prompt(playerName + "please choose ship type.");
  playerChoice = parseInt(playerChoice);
  switch (playerChoice) {
    case 2 :
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE_2;
      break;
    case 3 :
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE_3;
      break;
    case 1 :
    default:
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE_1;
      break;
  }
  return playerConstructor;
}
/*
debug
*/
  var render = function(){
//   Nakama.playerGroup.forEachAlive(function(sprite){
//     Nakama.game.debug.body(sprite);
//   });
//   Nakama.bulletGroup.forEachAlive(function(sprite){
//     Nakama.game.debug.body(sprite);
//   });
//   Nakama.enemyGroup.forEachAlive(function(sprite){
//     Nakama.game.debug.body(sprite);
//   });
 }
