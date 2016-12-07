class ShipTypeController extends BulletController{
	constructor(position,spriteName,direction,configs) {
		this.configs = configs;
		this.sprite = Nakama.bulletGroup.create(
		  position.x,
		  position.y,
		  'assets',
		  spriteName
    );
	}
}
