// src/server/controllers/GameController.js
import { Player } from '../models/Player.js';
import { Jail } from '../models/Houses/Jail.js';
export class GameController {
    static rollDice(io, socket, game) {
        const player = game.players[socket.id];
        const diceValues = game.rollAllDice();
        const totalRoll = diceValues.reduce((a, b) => a + b, 0);

        if (player) {
            // Lógica para mover o jogador, atualizando a posição no tabuleiro
            const currentPosition = game.board.positions.find(p => p.pawn.player.id === player.id).position;
            const newPosition = (currentPosition + totalRoll) % game.board.houses.length;

            game.board.movePawn(player, totalRoll);

            if (diceValues[0] === diceValues[1]) {
                player.double_counter += 1;
            } else {
                player.double_counter = 0;
            }

            // Se o jogador tiver os dados iguais 3x
            if (player.double_counter >= 3) {
                player.double_counter = 0;
                const jail = game.board.houses.find(house => house instanceof Jail);
                const jailPosition = jail.boardPosition;

                game.board.transferPawn(player, jailPosition);
                jail.visit(player, game.bank);
                io.emit('updatePositions', game.board.positions);
                io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                io.emit('playerArrested', { playerId: socket.id, message: `${player.name} foi preso por rolar três vezes o mesmo número.` });
            } else {
                io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                io.emit('updatePositions', game.board.positions); // Atualiza as posições no front-end
            }
        }
    }

    static playerConnect(io, socket, game, playerName) {
        const newPlayer = new Player(socket.id, playerName);
        game.addPlayer(socket.id, playerName);
        game.board.positions.push({ pawn: newPlayer.pawn, position: 0 }); // Inicializa a posição do peão do jogador
        io.emit('playerUpdate', game.players);
    }

    static playerDisconnect(io, socket, game) {
        game.removePlayer(socket.id);
        io.emit('playerUpdate', game.players);
    }
}

export default GameController;
