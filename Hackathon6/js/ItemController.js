//ITEMS CLASS
//Configs
//  -   SpriteName => Type

class ItemController {
    constructor(x, y, spriteName, configs) {
        this.configs = configs;
        this.item = Nakama.itemsGroup.create(
            x,
            y,
            spriteName
        );
        this.item.anchor = new Phaser.Point(0.5, 0.5);
        this.item.type = this.configs.type;
    }

    chooseItems() {
        switch (this.configs.type) {
            case 1:
                Nakama.game.items = coin;
                break;
            case 2:
                Nakama.game.items = banana;
                break;
            case 3:
                Nakama.game.items = tonic;
            case 4:
                Nakama.game.items = key;
            default:

        }
    }
}
