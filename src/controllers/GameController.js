// src/server/controllers/GameController.js
import { Player } from '../models/Player.js';
import { Jail } from '../models/Houses/Jail.js';
export class GameController {
    static rollDice(io, socket, game) {
        const player = game.players[socket.id];

        if (player) {
            const rollAndMove = () => {
                const diceValues = game.rollAllDice();
                const totalRoll = diceValues.reduce((a, b) => a + b, 0);

                // Se o jogador rolar dados iguais
                if (diceValues[0] === diceValues[1]) {
                    player.double_counter += 1;

                    // Se for a terceira vez, vai para a prisão
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
                        // Se não for a terceira vez, rola os dados novamente
                        io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                        rollAndMove(); // Rola os dados novamente
                    }
                } else {
                    // Se os valores forem diferentes, move o peão e visita a nova casa
                    player.double_counter = 0;
                    game.board.movePawn(player, totalRoll);
                    const currentPosition = game.board.positions.find(p => p.pawn.player.id === player.id).position;
                    const currentHouse = game.board.houses[currentPosition];
                    currentHouse.visit(player, game.bank);
                    io.emit('updatePositions', game.board.positions);
                    io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                }
            };

            rollAndMove();
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
