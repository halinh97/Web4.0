class BossController extends EnemyController{
    constructor(configs){
        super(configs);
    }

    enemyAttack() {
        this.enemy.animations.play('attack');
        var velx = player.sprite.position.x - this.enemy.position.x;
        var vely = player.sprite.position.y - this.enemy.position.y;
        var newBullet = new EnemyBullet(this.enemy.position.x,this.enemy.position.y,'BulletType1',velx,vely,{
            damage: this.configs.damage,
            BULLET_SPEED: 150,
        });

    }

    //Xem nguoi choi co gan minh khong
    checkPlayer() {
        var distance = Nakama.game.math.distance(this.enemy.position.x, this.enemy.position.y, player.sprite.position.x, player.sprite.position.y);
        if (distance < this.configs.distanceAttack) {
            if (distance > 100) {
                this.move(player.sprite.position.x - 10, player.sprite.position.y - 10);
            } else {
                this.enemy.body.velocity = new Phaser.Point(0, 0).setMagnitude(10);
                this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
                if (this.timeSinceLastFire >= this.configs.cooldown) {
                    this.enemyAttack();
                    this.timeSinceLastFire = 0;
                }
            }

        } else {
            //TODO
            //Di quanh vi chi cho truoc
            // console.log(this.timeMove);
            var lastMove = 1;
            var timeNeed = Nakama.game.math.distance(this.configs.x2, this.configs.y2, this.configs.x, this.configs.y) / this.configs.speed;
            //  console.log(timeNeed);
            if (this.timeMove >= timeNeed) {
                if (lastMove == 1) {
                    this.move(this.configs.x2, this.configs.y2);
                    lastMove = 2;
                } else {
                    this.move(this.configs.x, this.configs.y);
                    lastMove = 1;
                }

                this.timeMove = 0;

            }
            this.timeMove += Nakama.game.time.physicsElapsed;

        }
    }

}