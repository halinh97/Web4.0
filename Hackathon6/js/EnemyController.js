//CLASS ENEMY
//Configs
//  - enemySprite => Type Sprite
//  - distanceAttack => khoang cach toi thieu de tan cong
//  - animation: sleeping - attack - move - hurt (number of frame)
//  - khoi tao vi tri ban dau va vi tri canh gac: x,y -> x2,y2
//  - cooldown
class EnemyController {
    constructor(configs) {
        this.configs = configs;
        this.enemy = Nakama.enemyGroup.create(this.configs.x, this.configs.y, this.configs.enemySprite);
        this.enemy.anchor = new Phaser.Point(0.5, 0.5);
        this.enemy.body.setCircle(this.configs.hitBoxRadius, this.configs.hitBoxOffset.x, this.configs.hitBoxOffset.y);
        this.enemy.health = this.configs.health;
        this.enemy.maxhealth = this.configs.maxhealth;
        this.timeSinceLastFire = 0;
        this.timeMove = Nakama.game.math.distance(this.configs.x2, this.configs.y2, this.configs.x, this.configs.y) / this.configs.speed;

        //Health Bar
        this.enemy.healthbar = Nakama.enemyGroup.create(-20,-20,'Health');
        this.enemy.healthbar.cropEnabled = true;
        this.enemy.maxwidth = this.enemy.healthbar.width;
        this.enemy.healthbar.width= (this.enemy.health / this.enemy.maxhealth) * this.enemy.healthbar.width;

        this.enemy.addChild(this.enemy.healthbar);


        //Animations
        //  Sleeping
        var sleeping = [];
        for (var i = 0; i < this.configs.sleeping; i++) {
            sleeping.push(i);
        }
        this.enemy.animations.add('sleeping', sleeping, true);
        //  Attack
        var attack = [];
        for (var i = 0; i < (this.configs.attack); i++) {
            attack.push(i + this.configs.sleeping);
        }
        this.enemy.animations.add('attack', attack, this.configs.attack * 3, true);
        //  Hurt
        var hurt = [];
        for (var i = 0; i < this.configs.hurt; i++) {
            hurt.push(i + this.configs.sleeping + this.configs.attack);
        }
        this.enemy.animations.add('hurt', hurt, this.configs.hurt, false);
        //  Move
        var moveUp = [];
        var moveDown = [];
        var moveLeft = [];
        var moveRight = [];
        var moveUpLeft = [];
        var moveUpRight = [];
        var moveDownLeft = [];
        var moveDownRight = [];
        for (var i = 0; i < this.configs.move; i++) {
            moveUp.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt);
        }
        this.enemy.animations.add('moveUp', moveUp, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveDown.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move);
        }
        this.enemy.animations.add('moveDown', moveDown, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveLeft.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 2);
        }
        this.enemy.animations.add('moveLeft', moveLeft, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveRight.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 3);
        }
        this.enemy.animations.add('moveRight', moveRight, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveUpLeft.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 4);
        }
        this.enemy.animations.add('moveUpLeft', moveUpLeft, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveUpRight.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 5);
        }
        this.enemy.animations.add('moveUpRight', moveUpRight, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveDownLeft.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 6);
        }
        this.enemy.animations.add('moveDownLeft', moveDownLeft, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveDownRight.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 7);
        }
        this.enemy.animations.add('moveDownRight', moveDownRight, this.configs.move * 2, true);

    }

    updateHealth(){
        this.enemy.healthbar.width= (this.enemy.health / this.enemy.maxhealth) * this.enemy.maxwidth;
    }

    move(x, y) {
        //if(Math.round(x - this.enemy.position.x) ==0 && Math.round(y == this.enemy.position.y) ==0) return;

        this.enemy.body.velocity = new Phaser.Point(x - this.enemy.position.x, y - this.enemy.position.y).setMagnitude(this.configs.speed);

        if ((this.enemy.position.x - x) == 0) {
            if (this.enemy.position.y - y < 0) {
                //TODO
                //ANIMATIONS RIGHT
                this.enemy.animations.play('moveRight');

            } else {
                //TODO
                //ANIMATIONS LEFT
                this.enemy.animations.play('moveLeft');
            }
        }

        if ((this.enemy.position.y - y) == 0) {
            if (this.enemy.position.x - x < 0) {

                //TODO
                //ANIMATIONS DOWN
                this.enemy.animations.play('moveDown');
            } else {
                //TODO
                //ANIMATIONS UP
                this.enemy.animations.play('moveUp');
            }
        }

        if (this.enemy.position.x - x > 0 && this.enemy.position.x - x > 0) {
            //TODO
            //ANIMATION DOWN LEFT
            this.enemy.animations.play('moveDownLeft');
        }

        if (this.enemy.position.x - x < 0 && this.enemy.position.x - x > 0) {
            //TODO
            //ANIMATION UP LEFT
            this.enemy.animations.play('moveUpLeft');
        }

        if (this.enemy.position.x - x > 0 && this.enemy.position.x - x < 0) {
            //TODO
            //ANIMATION DOWN RIGHT
            this.enemy.animations.play('moveDownRight');
        }

        if (this.enemy.position.x - x < 0 && this.enemy.position.x - x < 0) {
            //TODO
            //ANIMATION UP RIGHT
            this.enemy.animations.play('moveUpRight');
        }

    }

    enemyAttack() {
        this.enemy.animations.play('attack');
        if (player.sprite.health >= 10) {
            player.sprite.health -= this.configs.damage;
        }
        console.log(player.sprite.health);

    }

    //Xem nguoi choi co gan minh khong
    checkPlayer() {
        this.updateHealth();
        var distance = Nakama.game.math.distance(this.enemy.position.x, this.enemy.position.y, player.sprite.position.x, player.sprite.position.y);
        if (distance < this.configs.distanceAttack) {
            if (distance > 25) {
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
