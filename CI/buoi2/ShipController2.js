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


		// 	var newBullet1  = Nakama.bulletGroup.create(
		// 	 	 this.bullet.position.x,
		// 	 	 this.bullet.position.y,
		// 	 	 'assets',
		// 	  "BulletType2.png"
		// 	  );
		// 	  newBullet1.anchor = new Phaser.Point(0.5,0.5);
		// 	  Nakama.game.physics.enable(newBullet1,Phaser.Physics.ARCADE);
		//
		// var newBullet2  = Nakama.bulletGroup.create(
		// 			 this.bullet.position.x,
		// 			 this.bullet.position.y,
		// 			 'assets',
		// 		 "BulletType2.png"
		// 		 );
		// 		 newBullet2.anchor = new Phaser.Point(0.5,0.5);
		// 		 Nakama.game.physics.enable(newBullet2,Phaser.Physics.ARCADE);
		//
		// var newBullet3  = Nakama.bulletGroup.create(
		// 		 	 this.bullet.position.x,
		// 		 	 this.bullet.position.y,
		// 		 	 'assets',
		// 		  "BulletType2.png"
		// 		  );
		// 		  newBullet3.anchor = new Phaser.Point(0.5,0.5);
		// 		  Nakama.game.physics.enable(newBullet3,Phaser.Physics.ARCADE);
		//
		// var newBullet4  = Nakama.bulletGroup.create(
		// 				 this.bullet.position.x,
		// 				 this.bullet.position.y,
		// 				 'assets',
		// 			 "BulletType1.png"
		// 			 );
		// 			 newBullet4.anchor = new Phaser.Point(0.5,0.5);
		// 			 Nakama.game.physics.enable(newBullet4,Phaser.Physics.ARCADE);
		//
		// var newBullet5  = Nakama.bulletGroup.create(
		//  				 this.bullet.position.x,
		//  				 this.bullet.position.y,
		//  				 'assets',
		//  			 "BulletType1.png"
		//  			 );
		//  			 newBullet5.anchor = new Phaser.Point(0.5,0.5);
		//  			 Nakama.game.physics.enable(newBullet5,Phaser.Physics.ARCADE);
		//
	  // //    newBullet1.body.velocity.y   = - Nakama.configs.BULLET_SPEED;
	  //       newBullet1.body.velocity = new Phaser.Point(0,-10).setMagnitude(Nakama.configs.BULLET_SPEED);
		// 			newBullet2.body.velocity = new Phaser.Point(1,-10).setMagnitude(Nakama.configs.BULLET_SPEED);
		// 			newBullet3.body.velocity = new Phaser.Point(-1,-10).setMagnitude(Nakama.configs.BULLET_SPEED);
		// 			newBullet4.body.velocity = new Phaser.Point(2,-10).setMagnitude(Nakama.configs.BULLET_SPEED);
		// 			newBullet5.body.velocity = new Phaser.Point(-2,-10).setMagnitude(Nakama.configs.BULLET_SPEED);

	  }
	}
