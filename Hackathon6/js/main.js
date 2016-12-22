var Nakama = {
    coins: 0,
    score: 0,
    key: 2
};
Nakama.configs = {
    MOVE_SPEED: 100
}

//SETUP
var map;
var layer;
var layer2;
var player;
var enemy;
var items = [];
var text_score;
var banana;
var text_gameover;
var stateText;
var numkey = 0;
var numEnemy = 10;
var numBoss = 0;
var curTime = 0;
var bossTime = 1;
var timeToRestart = 0;
var pokemonName;

window.onload = function () {
    Nakama.game = new Phaser.Game(800, 450, Phaser.AUTO, '',
        {
            preload: preload,
            create: create,
            update: update,
            render: render
        }, false, false
    );
}

// preparations before game starts
var preload = function () {
    Nakama.game.scale.minWidth = 640;
    Nakama.game.scale.minHeight = 360;
    Nakama.game.scale.maxWidth = 800;
    Nakama.game.scale.maxHeight = 450;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.time.advancedTiming = true;

    //Load Assets
    //  MAP
    Nakama.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    Nakama.game.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    Nakama.game.load.image('map_tile1', 'assets/maps/0.png');
    Nakama.game.load.image('22', 'assets/maps/22.png');
    Nakama.game.load.image('24', 'assets/maps/24.png');
    Nakama.game.load.image('25', 'assets/maps/25.png');
    Nakama.game.load.image('26', 'assets/maps/26.png');
    Nakama.game.load.image('27', 'assets/maps/27.png');

    //  PLAYER
    Nakama.game.load.spritesheet('Aerodactyl', 'assets/Aerodactyl.png', 41, 32);
    Nakama.game.load.spritesheet('Aerodactyls', 'assets/Aerodactyls.png', 41, 32);
    Nakama.game.load.spritesheet('Kabutop', 'assets/Kabutop.png', 33, 32);
    Nakama.game.load.spritesheet('Moltres-67x61', 'assets/Moltres-67x61.png', 67, 61);
    Nakama.game.load.spritesheet('Pinser-37x30', 'assets/Pinser-37x30.png', 37, 30);

    // ITEMS
    Nakama.game.load.image('Money-14x16', 'assets/Money-14x16.png');
    Nakama.game.load.image('Banana', 'assets/Banana.png');
    Nakama.game.load.image('Tonic', 'assets/Tonic.png');
    Nakama.game.load.image('Rope', 'assets/Rope.png');
    Nakama.game.load.image('Key', 'assets/Key.png');

    //BULLET
    Nakama.game.load.image('BulletType1', 'assets/BulletType1.png');

    //Health Bar
    Nakama.game.load.image('Health', 'assets/Health.png');
}

// initialize the game
var create = function () {
    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard

    //Group
    Nakama.mapGroup = Nakama.game.add.group();
    Nakama.playerGroup = Nakama.game.add.physicsGroup();
    Nakama.itemsGroup = Nakama.game.add.physicsGroup();
    Nakama.enemyGroup = Nakama.game.add.physicsGroup();
    Nakama.bulletEnemy = Nakama.game.add.physicsGroup();
    Nakama.ropeGroup = Nakama.game.add.physicsGroup();

    Nakama.enemyController = [];
    Nakama.bossController = [];
    //MAP
    loadMap(2);

    //Choice Name
    var player1Name = choiceName();
    pokemonName = player1Name;

    //Player
    var hitBoxOffset = new Phaser.Point(10, 8);
    player = new PlayerController(Nakama.game.world.centerX, Nakama.game.world.centerY, {
        up: Phaser.Keyboard.UP,
        down: Phaser.Keyboard.DOWN,
        left: Phaser.Keyboard.LEFT,
        right: Phaser.Keyboard.RIGHT,
        attackKey: Phaser.Keyboard.SHIFT,
        attackRange: 25,
        cooldown: 0.2,
        character: 'Aerodactyls',
        sleeping: 2,
        attack: 2,
        hurt: 1,
        move: 3,
        health: 100,
        damage: 10,
        hitBoxRadius: 10,
        hitBoxOffset: hitBoxOffset,
        playerName: player1Name
    });

    //ITEMS
    initItems();

    //ROPE
    var rope1 = new RopeController(1200, 700, 'Rope');
    var rope2 = new RopeController(1000, 800, 'Rope');
    var rope3 = new RopeController(700, 700, 'Rope');

    //CAMERA FOLLOW PLAYER
    Nakama.game.camera.follow(player.sprite);

    //TEXT INFO
    text_score = Nakama.game.add.text(Nakama.game.world.left + 10, 40, 'SCORE : ' + Nakama.score + '\nCOINS   : ' + Nakama.coins + '\nKEYS: ' + numkey + '/' + Nakama.key, {
        font: "65px Arial",
        fill: "#ff0044",
        align: 'left',
        fontSize: 20,
    });
    text_score.anchor = new Phaser.Point(0, 0.5);
    text_score.fixedToCamera = true;
    text_score.cameraOffset.setTo(Nakama.game.world.left + 10, 40);

    stateText = Nakama.game.add.text(Nakama.game.world.centerX, Nakama.game.world.centerY, ' ', {
        font: '84px Arial',
        fill: '#ff0044'
    });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

}


// update game state each frame
var update = function () {
    // //CHANGE MAP
    // if (Nakama.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    //     console.log('change map')
    //     loadMap(2);
    // }

    curTime += Nakama.game.time.physicsElapsed;

    //Collide
    Nakama.game.physics.arcade.collide(Nakama.playerGroup, layer);
    Nakama.game.physics.arcade.collide(Nakama.enemyGroup, layer);

    //ENEMY
    initEnemy();

    player.update();

    for (var i = 0; i < Nakama.enemyController.length; i++) {
        Nakama.enemyController[i].checkPlayer();
    }
    for(var i =0;i< Nakama.bossController.length;i++){
        Nakama.bossController[i].checkPlayer();
    }

    gameOver();
    checkVictory();

    Nakama.game.physics.arcade.overlap(Nakama.itemsGroup, Nakama.playerGroup, playerHitItems);
    Nakama.game.physics.arcade.overlap(Nakama.ropeGroup, Nakama.playerGroup, playerHitRope);
    Nakama.game.physics.arcade.overlap(Nakama.enemyGroup, Nakama.playerGroup, playerHitEnemy);
    Nakama.game.physics.arcade.overlap(Nakama.bulletEnemy, Nakama.playerGroup, bulletHitPlayer);
    text_score.setText('SCORE : ' + Nakama.score + '\nCOINS   : ' + Nakama.coins + '\nKEYS: ' + numkey + '/' + Nakama.key);
}

//bulletHitPlayer
function bulletHitPlayer(bulletsprite,playersprite) {
    playersprite.health -= bulletsprite.damage;
    bulletsprite.kill();
}


//KILL ENEMY
function playerHitEnemy(enemysprite, playersprite) {
    if (enemysprite.health == 0) {
        enemysprite.kill();
    }
}
//BREAK ROPES
function playerHitRope(ropesprite, playersprite) {
    ropesprite.kill();
    if ((ropesprite.position.x == 700 && ropesprite.position.y == 700) || (ropesprite.position.x == 1000 && ropesprite.position.y == 800)) {
        var keyNew = new ItemController(ropesprite.position.x, ropesprite.position.y, 'Key', {type: 4});
    }

}
//KILL ITEMS
function playerHitItems(itemsprite, playersprite) {
    switch (itemsprite.type) {
        case 1:
            Nakama.coins += 1;
            Nakama.score += 5;
            break;
        case 2:
            playersprite.health += 10;

            break;
        case 3:
            playersprite.damage += 1;
            break;
        case 4:
            numkey++;
            break;
        default:

    }

    itemsprite.kill();
    items.splice(items.indexOf(itemsprite), 1);

}

function gameOver() {

    if (player.sprite.health <= 0) {
        player.sprite.kill();
        stateText.text = "GAME OVER";
        stateText.visible = true;
        timeToRestart += Nakama.game.time.physicsElapsed;
        console.log(timeToRestart);
    }
    if (timeToRestart > 5) {
        hitBoxOffset = new Phaser.Point(10, 8);
        player = new PlayerController(Nakama.game.world.centerX, Nakama.game.world.centerY, {
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT,
            attackKey: Phaser.Keyboard.SHIFT,
            attackRange: 25,
            cooldown: 0.2,
            character: 'Aerodactyls',
            sleeping: 2,
            attack: 2,
            hurt: 1,
            move: 3,
            health: 100,
            damage: 10,
            hitBoxRadius: 10,
            hitBoxOffset: hitBoxOffset,
            playerName: pokemonName
        });
        Nakama.game.camera.follow(player.sprite);
        timeToRestart=0;stateText.visible = false;
    }
}

function initItems() {
    //items
    for (var i = 0; i < 20; i++) {
        var itemsType1 = new ItemController(
            Math.random() * 1000 + 300,
            Math.random() * 1000 + 300,
            'Money-14x16',
            {type: 1});
        items.push(itemsType1);
    }
    for (var i = 0; i < 20; i++) {
        var itemsType2 = new ItemController(
            Math.random() * 1000 + 300,
            Math.random() * 1000 + 300,
            'Banana',
            {type: 2});
        items.push(itemsType2);
    }

    for (var i = 0; i < 20; i++) {
        var itemsType3 = new ItemController(
            Math.random() * 1000 + 300,
            Math.random() * 1000 + 300,
            'Tonic',
            {type: 3});
        items.push(itemsType3);
    }
}

function initEnemy() {
    var hitBoxOffset = new Phaser.Point(10, 8);
    if (Nakama.enemyController.length < numEnemy) {
        var spritetype = getRandomInt(1, 2);
        var spriteName = 'Moltres-67x61';
        switch (spritetype) {
            case 1:
                spriteName = 'Pinser-37x30';
                break;
            case 2:
                spriteName = 'Kabutop';
                break;
        }
        var positonX = Math.random() * 1000 + 100;
        var positonY = Math.random() * 1000 + 100;
        var rangeX = getRandomInt(-200,200);
        var rangeY = getRandomInt(-200,200);

        var Newenemy = new EnemyController({
            enemySprite: spriteName,
            sleeping: 2,
            attack: 2,
            hurt: 1,
            move: 3,
            health: 100,
            maxhealth: 100,
            damage: 10,
            distanceAttack: 50,
            x: positonX,
            y: positonY,
            x2: positonX + rangeX,
            y2: positonY + rangeY,
            speed: 50,
            cooldown: 1,
            hitBoxRadius: 5,
            hitBoxOffset: hitBoxOffset,
        });
        Nakama.enemyController.push(Newenemy);
    }


    if (Nakama.bossController.length < numBoss && curTime > bossTime) {
        curTime = 0;
        var spriteName = 'Moltres-67x61';

        var positonX = Math.random() * 1000 + 100;
        var positonY = Math.random() * 1000 + 100;
        var rangeX = getRandomInt(-200,200);
        var rangeY = getRandomInt(-200,200);

        var Newenemy = new BossController({
            enemySprite: spriteName,
            sleeping: 2,
            attack: 2,
            hurt: 1,
            move: 3,
            health: 200,
            maxhealth: 200,
            damage: 10,
            distanceAttack: 150,
            x: positonX,
            y: positonY,
            x2: positonX + rangeX,
            y2: positonY + rangeY,
            speed: 50,
            cooldown: 1,
            hitBoxRadius: 20,
            hitBoxOffset: hitBoxOffset,
        });
        Nakama.bossController.push(Newenemy);
    }

}

function loadMap(number) {
    for (var i = 0; i < items.length; i++) {
        items[i].item.kill();
    }
    switch (number) {
        case 1: {
            map = Nakama.game.add.tilemap('map' + number);
            map.addTilesetImage('map_tile1');
            break;
        }
        case 2: {
            map = Nakama.game.add.tilemap('map' + number);
            map.addTilesetImage('22');
            map.addTilesetImage('24');
            map.addTilesetImage('25');
            map.addTilesetImage('26');
            map.addTilesetImage('27');
            break;
        }
        default:
            map = Nakama.game.add.tilemap('map' + number);
            map.addTilesetImage('map_tile1');

    }

    // //FIX POSITON PLAYER CHANGE MAP
    // player.sprite.position = new Phaser.Point(100, 200);

    layer2 = map.createLayer('Background');
    layer2.resizeWorld();
    layer = map.createLayer('Wall');
    layer.resizeWorld();
    map.setCollisionBetween(1, 8000, true, 'Wall');

    //ADD MAP TO GROUP
    Nakama.mapGroup.add(layer);
    Nakama.mapGroup.add(layer2);
}

function checkVictory() {
    if (numkey >= Nakama.key) {
        stateText.text = "VICTORY";
        stateText.visible = true;
    }
}

function choiceName() {
    var playerName = prompt('Please choice Pokemon name: ');
    return playerName;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// before camera render (mostly for debug)
var render = function () {


    Nakama.enemyGroup.forEachAlive(function (sprite) {
        Nakama.game.debug.body(sprite);
    })

    Nakama.playerGroup.forEachAlive(function (sprite) {
        Nakama.game.debug.body(sprite);
    })
}
