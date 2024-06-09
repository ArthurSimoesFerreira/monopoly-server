// src/server/controllers/GameController.js
import { Player } from "../models/Player.js";

export class GameController {
    static rollDice(io, socket, game) {
        const player = game.players[socket.id];
        const diceValues = game.rollAllDice();
        const totalRoll = diceValues.reduce((a, b) => a + b, 0);

        if (player) {
            // Lógica para mover o jogador, atualizando a posição no tabuleiro
            player.move(totalRoll);
            io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
            io.emit('updatePositions', game.positions); // Atualiza as posições no front-end
        }
    }

    static playerConnect(io, socket, game, playerName) {
        const newPlayer = new Player(socket.id, playerName);
        game.addPlayer(socket.id, playerName);
        io.emit('playerUpdate', game.players);
    }

    static playerDisconnect(io, socket, game) {
        game.removePlayer(socket.id);
        io.emit('playerUpdate', game.players);
    }
}

export default GameController;
