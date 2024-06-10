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
        // Lógica de compra
    }

    sell(player, bank) {
        // Lógica de venda
    }

    auction() {
        // Lógica de leilão
    }

    hasOwner() {
        return this.owner !== null;
    }

    payRent(player, bank) {
        // Lógica de pagamento de aluguel
    }

    visit(player, bank) {
        // Lógica de visita
    }

    setOwner(player) {
        this.owner = player;
    }
}
