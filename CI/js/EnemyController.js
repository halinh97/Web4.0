class EnemyController {
		constructor(x,y,spriteName,configs){
		    //
		    this.configs = configs;
		    this.enemy = Nakama.enemyGroup.create(
		    x,
		    y,
		    'assets',
		    spriteName);
		    this.enemy.anchor = new Phaser.Point(0.5,0.5);//chinh toa do chinh giua
		    this.enemy.health = this.configs.health;
		    this.timeSinceLastFire = 0;
		  }
		}
