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

                if (diceValues[0] === diceValues[1]) {
                    player.double_counter += 1;

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
                        rollAndMove();
                    }
                } else {
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
        game.board.positions.push({ pawn: newPlayer.pawn, position: 0 });
        io.emit('playerUpdate', game.players);
    }

    static playerDisconnect(io, socket, game) {
        game.removePlayer(socket.id);
        io.emit('playerUpdate', game.players);
    }

    static transaction(io, socket, game, senderId, receiverId, amount) {
        const sender = game.players[senderId];
        const receiver = game.players[receiverId];
        if (sender && receiver) {
            if (game.bank.transferMoney(sender, receiver, amount)) {
                io.emit('transactionSuccess', { senderId, receiverId, amount });
            } else {
                io.emit('transactionFailed', { senderId, receiverId, amount });
            }
        }
    }

    static bankPayment(io, socket, game, playerId, amount) {
        const player = game.players[playerId];
        if (player) {
            game.bank.giveMoney(player, amount);
            io.emit('bankPaymentSuccess', { playerId, amount });
        }
    }

    static bankCollection(io, socket, game, playerId, amount) {
        const player = game.players[playerId];
        if (player) {
            if (game.bank.collectMoney(player, amount)) {
                io.emit('bankCollectionSuccess', { playerId, amount });
            } else {
                io.emit('bankCollectionFailed', { playerId, amount });
            }
        }
    }

    static buyHouse(io, socket, game, playerId, cost) {
        const player = game.players[playerId];
        if (player) {
            if (game.bank.buyHouse(player, cost)) {
                io.emit('buyHouseSuccess', { playerId, cost });
            } else {
                io.emit('buyHouseFailed', { playerId, cost });
            }
        }
    }

    static buyHotel(io, socket, game, playerId, cost) {
        const player = game.players[playerId];
        if (player) {
            if (game.bank.buyHotel(player, cost)) {
                io.emit('buyHotelSuccess', { playerId, cost });
            } else {
                io.emit('buyHotelFailed', { playerId, cost });
            }
        }
    }
}

export default GameController;
