import { Player } from "../Player.js";
import { House } from "../House.js";
export class Property extends House {
    constructor(propertyName, price, rent) {
        this.propertyName = propertyName;
        this.owner = null;
        this.price = price;
        this.rent = rent;
    }

    buy(player, bank) {
        if (bank.collectMoney(player, this.price)) {
            this.owner = player;
            player.addResidential(this);
            return true;
        }
        else return false;
    }

    sell(player, bank) {
        bank.transferMoney(player, this.owner, this.price);
        this.setOwner(player);
    }

    auction() {
        // Lógica de leilão
    }


    payRent(player, bank) {
        bank.collectMoney(player, this.rent);
    }

    visit(player, bank, io) {
        this.payRent(player, bank);
    }
}
