import { Property } from "../Property";

export class Residential extends Property {
    constructor(boardPosition, propertyName, price, rent, houses, hotel) {
        super(boardPosition, propertyName, price, rent);
        this.houses = houses;
        this.hotel = hotel;
    }

    buyHouse(bank) {
        // Lógica de compra de casa
    }

    sellHouse(bank) {
        // Lógica de venda de casa
    }

    rentValue() {
        // Lógica para calcular o valor do aluguel
    }

    visit(player, bank) {
        // Lógica de visita
    }
}