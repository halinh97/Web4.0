class BulletType3Controller extends BulletController{
  constructor(position, direction, configs){
    var spriteName = "BulletType3.png";
    super(position, spriteName, direction, configs);
    this.sprite.anchor = new Phaser.Point(0.5, 1);
    this.sprite.body.velocity = direction.setMagnitude(Nakama.configs.BULLET_SPEED);
  }

}
