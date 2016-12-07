class ShipController {
	constructor(x,y,spriteName,configs){
    this.configs = configs;
    this.sprite  = Nakama.playerGroup.create(
			x,
		  y,
		 'assets',
		  spriteName
	 	);
   this.sprite.anchor = new Phaser.Point(0.5,0.5);//chinh toa do chinh giua
	 this.sprite.health = configs.health;
	 this.sprite.body.collideWorldBounds = true;

	 this.sprite.body.setCircle(this.configs.hitBoxRadius,this.configs.hitBoxOffset.x,this.configs.hitBoxOffset.y);
   this.timeSinceLastFire = 0;
  }

		update(){
	    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;

	    if(Nakama.keyboard.isDown(this.configs.up)){
	      this.sprite.body.velocity.y = -Nakama.configs.SHIP_SPEED;
	    }
	    else if(Nakama.keyboard.isDown(this.configs.down)){
	      this.sprite.body.velocity.y = Nakama.configs.SHIP_SPEED;
	    }
	    else{
	      this.sprite.body.velocity.y = 0;
	    }
	    if(Nakama.keyboard.isDown(this.configs.left)){
	      this.sprite.body.velocity.x = -Nakama.configs.SHIP_SPEED;
	    }
	    else if(Nakama.keyboard.isDown(this.configs.right)){
	      this.sprite.body.velocity.x = Nakama.configs.SHIP_SPEED;
	    }
	    else{
	    this.sprite.body.velocity.x = 0;
	    }
	    if(Nakama.keyboard.isDown(this.configs.fire) && this.timeSinceLastFire >= this.configs.cooldown){
	    this.fire();
	    this.timeSinceLastFire = 0;
	    }
	  }
  fire(){}
}
