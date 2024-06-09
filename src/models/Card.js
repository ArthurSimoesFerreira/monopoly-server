// src/models/Card.js
export class Card {
    constructor(description, type, isOwnable) {
        this.description = description;
        this.type = type;
        this.isOwnable = isOwnable;
    }

    cardAction(player, board, bank, players) {
        // Lógica de ação da carta
    }
}