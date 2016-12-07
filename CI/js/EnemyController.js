class EnemyController {
	constructor(position,spriteName,configs) {
		this.configs = configs;
		this.enemy = Nakama.enemyGroup.create(
			position.x,
			position.y,
		  'assets',
			spriteName);
		this.enemy.health = configs.health;
		this.enemy.anchor = new Phaser.Point(0.5,0.5);
		this.timeSinceLastFireE = 0;
	}
}
