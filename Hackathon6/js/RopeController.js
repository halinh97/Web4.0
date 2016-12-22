class RopeController{
  constructor(x, y, spriteName){
    this.rope = Nakama.ropeGroup.create(
      x,
      y,
      spriteName
    );
    this.rope.anchor= new Phaser.Point(0.5,0.5);
  }
}
