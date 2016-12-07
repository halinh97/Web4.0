class ShipType2Controller extends ShipController{
  constructor(x,y,isPlayer1,configs){
    var spriteName = "Spaceship2-"+(isPlayer1?"Player": "Partner")+".png";
    configs.cooldown = 0.3;
    configs.health = 100;
    configs.hitBoxRadius = 15;
    configs.hitBoxOffset = new Phaser.Point(25,20);
    super(x,y,spriteName,configs);
    this.sprite.anchor = new Phaser.Point(0.5,0);
  }

  fire(){
    new BulletType2Controller(this.sprite.position, new Phaser.Point(0,-10), { power  : 30 });
    new BulletType2Controller(this.sprite.position, new Phaser.Point(1,-10), { power  : 30 });
    new BulletType2Controller(this.sprite.position, new Phaser.Point(-1,-10),{power   : 30 });
    new BulletType2Controller(this.sprite.position, new Phaser.Point(3,-10), { power  : 30 });
    new BulletType2Controller(this.sprite.position, new Phaser.Point(-3,-10),{ power  : 30 });
  }
}
