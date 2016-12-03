class ShipController {
		constructor(x,y,spriteName,configs){
	    //toa do,anh ,khung
	    this.configs = configs;
	    this.bullet = Nakama.playerGroup.create(
	    x,
	    y,
	    'assets',
	   spriteName);
	    this.bullet.anchor = new Phaser.Point(0.5,0.5);//chinh toa do chinh giua

	    this.timeSinceLastFire = 0;
	    //this.fire();
	  }

		update(){
	    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;

	    if(Nakama.keyboard.isDown(this.configs.up)){
	      this.bullet.body.velocity.y = -Nakama.configs.SHIP_SPEED;
	    }
	    else if(Nakama.keyboard.isDown(this.configs.down)){
	        this.bullet.body.velocity.y = Nakama.configs.SHIP_SPEED;
	    }
	    else{
	  this.bullet.body.velocity.y = 0;
	    }
	    if(Nakama.keyboard.isDown(this.configs.left)){
	      this.bullet.body.velocity.x = -Nakama.configs.SHIP_SPEED;
	    }
	    else if(Nakama.keyboard.isDown(this.configs.right)){
	        this.bullet.body.velocity.x = Nakama.configs.SHIP_SPEED;
	    }
	    else{
	    this.bullet.body.velocity.x = 0;
	    }
	    if(Nakama.keyboard.isDown(this.configs.fire) && this.timeSinceLastFire >= this.configs.cooldown){
	    this.fire();
	    this.timeSinceLastFire = 0;
	   }
	 }

		fire(){

	var newBullet  = new BulletController(this.bullet, "BulletType2.png",0,-10, {});

	var newBullet1 = new BulletController(this.bullet, "BulletType2.png",1,-10, {});

	var newBullet2 = new BulletController(this.bullet, "BulletType2.png",-1,-10, {});

	var newBullet3 = new BulletController(this.bullet, "BulletType1.png",2,-10, {});

	var newBullet4 = new BulletController(this.bullet, "BulletType1.png",-2,-10, {});

	  }
	}
