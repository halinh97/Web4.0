class BulletType2Controller extends BulletController{
  constructor(position, direction, configs){
    var spriteName = "BulletType2.png";
    super(position, spriteName, direction, configs);
    this.sprite.update = this.update.bind(this);
  }

  update() {
    if(this.target) {
      this.sprite.body.velocity.setTo(this.sprite.body.velocity.x + this.target.x - this.sprite.x , this.sprite.body.velocity.y + this.target.y - this.sprite.y).setMagnitude(Nakama.configs.BULLET_SPEED);
    } else {
      //va cham,tao con cua enemy
      for(var i = 0; i < Nakama.enemyGroup.children.length; i++) {
        var enemy = Nakama.enemyGroup.children[i];
        if(enemy._exists) {
          this.target = enemy;
          return;
        }
      }
    }
  }
}
