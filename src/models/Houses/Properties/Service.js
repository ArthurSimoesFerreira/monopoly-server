import { Property } from "../Property";
export class Service extends Property {
    constructor(propertyName, price, rent, qtd) {
        super(propertyName, price, rent, qtd);
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