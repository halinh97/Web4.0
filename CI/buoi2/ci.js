var Nakama = {};
//thay mot gia trij nao do
Nakama.configs = {
  SHIP_SPEED : 200
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
}
var preload = function(){
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
//khoi tao game
var create = function(){
  //trong luc ,va cham...tong luc ..
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  // ve hinh con tau
  // Nakama.ship = Nakama.game.add.sprite(
  // 200,
  // 800,
  // 'assets',
  // "Spaceship2-Player.png");
  // Nakama.game.physics.enable(Nakama.ship,Phaser.Physics.ARCADE);
  // //he thong vat li:toa do ,anh
  // Nakama.ship1 = Nakama.game.add.sprite(
  // 400,
  // 800,
  // 'assets',
  // "Spaceship2-Partner.png");//ten anh
  // Nakama.game.physics.enable(Nakama.ship1,Phaser.Physics.ARCADE);
  Nakama.shipControllers = [];
  var player1 = new ShipController(200,400,"Spaceship2-Player.png",{
    up : Phaser.Keyboard.UP,
    down : Phaser.Keyboard.DOWN,
    left : Phaser.Keyboard.LEFT,
    right : Phaser.Keyboard.RIGHT,
  });
  Nakama.shipControllers.push(player1);
  var player2 = new ShipController(300,400,"Spaceship2-Partner.png",{
    up : Phaser.Keyboard.W,
    down :Phaser.Keyboard.S,
    left : Phaser.Keyboard.A,
    right : Phaser.Keyboard.D,

  });
  Nakama.shipControllers.push(player2);
}
//dieu khien
//nut nao dang bi an xuong
// if(Nakama.keyboard.isDown(Phaser.Keyboard.UP)){
//   Nakama.ship.body.velocity.y = -Nakama.configs.SHIP_SPEED;
// }
// else if(Nakama.keyboard.isDown(Phaser.Keyboard.DOWN)){
//     Nakama.ship.body.velocity.y = Nakama.configs.SHIP_SPEED;
// }
// else{
//   Nakama.ship.body.velocity.y = 0;
// }
// if(Nakama.keyboard.isDown(Phaser.Keyboard.LEFT)){
//   Nakama.ship.body.velocity.x = -Nakama.configs.SHIP_SPEED;
// }
// else if(Nakama.keyboard.isDown(Phaser.Keyboard.RIGHT)){
//     Nakama.ship.body.velocity.x = Nakama.configs.SHIP_SPEED;
// }
// else{
//   Nakama.ship.body.velocity.x = 0;
// }
// if(Nakama.keyboard.isDown(Phaser.Keyboard.W)){
//   Nakama.ship1.body.velocity.y = -Nakama.configs.SHIP_SPEED;
// }
// else if(Nakama.keyboard.isDown(Phaser.Keyboard.S)){
//     Nakama.ship1.body.velocity.y = Nakama.configs.SHIP_SPEED;
// }
// else{
//   Nakama.ship1.body.velocity.y = 0;
// }
// if(Nakama.keyboard.isDown(Phaser.Keyboard.A)){
//   Nakama.ship1.body.velocity.x = -Nakama.configs.SHIP_SPEED;
// }
// else if(Nakama.keyboard.isDown(Phaser.Keyboard.D)){
//     Nakama.ship1.body.velocity.x = Nakama.configs.SHIP_SPEED;
// }
// else{
//   Nakama.ship1.body.velocity.x = 0;
var update = function(){
  for(var i =0;i<Nakama.shipControllers.length;i++){
    Nakama.shipControllers[i].update();
  }
}
var render = function(){}
