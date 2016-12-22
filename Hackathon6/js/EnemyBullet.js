//CLASS Enemy Bullet
class EnemyBullet{
    constructor(x,y,spriteName,velx,vely,configs) {
        this.configs = configs;
        this.ebullet = Nakama.bulletEnemy.create(x, y, spriteName);
        this.ebullet.anchor = new Phaser.Point(0.5, 0.5);
        this.ebullet.damage = this.configs.damage;
        this.ebullet.body.velocity = new Phaser.Point(velx, vely).setMagnitude(this.configs.BULLET_SPEED);
        this.ebullet.angle = Math.atan2(velx, -vely) * (180 / Math.PI);
    }
}