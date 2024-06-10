// src/models/Board.js
import { Player } from './Player.js';
import { Property } from './Houses/Property.js';
import { House } from './House.js';

export class Board {
    constructor() {
        this.houseQuantity = 0;
        this.positions = []; // [{ pawn: Pawn, position: int }]
        this.currentHouse = null;
        this.houses = [];
    }

    initializeBoard() {
        // Lógica para inicializar o tabuleiro
    }

    movePawn(player, moveSpaces) {
        const playerPosition = this.positions.find(p => p.pawn.player.id === player.id);
        if (playerPosition) {
            playerPosition.position = (playerPosition.position + moveSpaces) % this.houses.length;
        }
    }

    transferPawn(player, finalPosition) {
        const playerPosition = this.positions.find(p => p.pawn.player.id === player.id);
        if (playerPosition) {
            playerPosition.position = finalPosition;
        }
    }

    sameOwnerCount(player, property) {
        // Lógica para contar quantas propriedades o jogador possui do mesmo tipo
    }
}
