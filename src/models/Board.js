// src/models/Board.js
import { Player } from './Player.js';
import { Property } from './Property.js';
import { House } from './House.js';

export class Board {
    constructor() {
        this.houseQuantity = 0;
        this.positions = []; // [{ pawn: Pawn, position: int }]
        this.currentHouse = null;
    }

    initializeBoard() {
        // Lógica para inicializar o tabuleiro
    }

    movePawn(player, moveSpaces) {
        // Lógica para mover o peão do jogador
    }

    transferPawn(player, finalPosition) {
        // Lógica para transferir o peão do jogador para a posição final
    }

    sameOwnerCount(player, property) {
        // Lógica para contar quantas propriedades o jogador possui do mesmo tipo
    }
}
