class BulletController {
		constructor(bullets,spriteName,x1,y1,configs) {
		    this.configs = configs;
		    this.bullet = Nakama.bulletGroup.create(
		    bullets.position.x,
		    bullets.position.y,
		    'assets',
		    spriteName);
		    this.bullet.anchor = new Phaser.Point(0.5,0.5);//chinh toa do chinh giua
		    this.bullet.body.velocity = new Phaser.Point(x1,y1).setMagnitude(Nakama.configs.BULLET_SPEED);
		    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
		  }
		}
