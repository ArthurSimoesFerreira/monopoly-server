import { Property } from "../Property";
export class Station extends Property {
    constructor(boardPosition, propertyName, price, rent) {
        super(boardPosition, propertyName, price, rent);
    }

    rentValue() {
        // Lógica para calcular o valor do aluguel
    }

    payRent(player, bank) {
        // Lógica de pagamento de aluguel
    }

    visit(player, bank) {
        // Lógica de visita
    }
}