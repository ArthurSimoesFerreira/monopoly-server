// src/models/Board.js
import { Player } from './Player.js';
import { Property } from './Houses/Property.js';
import { House } from './House.js';
import { Pawn } from './Pawn.js';

export class Board {

    static instance = null;

    static get_instance() {
        if (!Board.instance) {
            Board.instance = new Board()
        }
        return Board.instance
    }

    constructor() {
        if (Board.instance) {
            throw new Error("This class is a Singleton!");
        }

        this.houseQuantity = 0;
        this.positions = []; // [{ pawn: Pawn, position: int }]
        this.currentHouse = null;
        this.houses = [];
    }

    movePawn(player, moveSpaces) {
        const playerPosition = this.positions.find(p => p.pawn.player.id === player.id);
        if (playerPosition) {
            const newPosition = (playerPosition.position + moveSpaces) % this.houses.length;
            playerPosition.position = newPosition;
            this.updatePawnPosition(player.id, newPosition);
            this.currentHouse = this.houses[newPosition];
        }
        return this.currentHouse;
    }

    transferPawn(player, finalPosition) {
        const playerPosition = this.positions.find(p => p.pawn.player.id === player.id);
        if (playerPosition) {
            playerPosition.position = finalPosition;
            this.updatePawnPosition(player.id, finalPosition);
            this.currentHouse = this.houses[finalPosition];
        }
    }

    updatePawnPosition(playerId, newPosition) {
        const index = this.positions.findIndex(p => p.pawn.player.id === playerId);
        if (index !== -1) {
            this.positions[index].position = newPosition;
        }
    }

    sameOwnerCount(player, property) {
        // Lógica para contar quantas propriedades o jogador possui do mesmo tipo
    }
}
