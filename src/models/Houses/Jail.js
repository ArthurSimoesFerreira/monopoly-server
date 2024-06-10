// src/models/Jail.js
import { House } from "../House.js";
export class Jail extends House {
    constructor(boardPosition) {
        super(boardPosition);
        this.type = "jail";
    }

    visit(player, bank) {
        player.beArrested();
        // Lógica adicional para a visita à prisão
    }
}
