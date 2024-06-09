import { House } from "../House";

export class ChanceHouse extends House {
    constructor(boardPosition, type) {
        super(boardPosition);
        this.type = type;
    }

    visit(player, bank) {
        // Lógica de visita para a casa de carta
    }
}