import { Property } from "../Property";
export class Station extends Property {
    constructor(propertyName, price, rent) {
        super(propertyName, price, rent);
    }

    rentValue() {
        // Lógica para calcular o valor do aluguel
    }

    payRent(player, bank) {
        // Lógica de pagamento de aluguel
    }

    visit(player, bank, io) {
        // Lógica de visita
    }
}