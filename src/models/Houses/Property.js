import { Player } from "../Player.js";
import { House } from "../House.js";
export class Property extends House {
    constructor(boardPosition, propertyName, price, rent) {
        super(boardPosition);
        this.propertyName = propertyName;
        this.owner = null;
        this.price = price;
        this.rent = rent;
    }

    buy(player, bank) {
        this.setOwner(player);
    }

    sell(player, bank) {
        bank.transferMoney(player, this.owner, this.price);
        this.setOwner(player);
    }

    auction() {
        // Lógica de leilão
    }

    hasOwner() {
        return this.owner !== null;
    }

    payRent(player, bank) {
        bank.transferMoney(player, this.owner, this.rent);
    }

    visit(player, bank) {
        if(player != this.owner){
            this.payRent(player, bank);
        }
    }

    setOwner(player) {
        this.owner = player;
    }
}
