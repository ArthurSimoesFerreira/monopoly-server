// src/server/controllers/GameController.js
import { Player } from '../models/Player.js';
import { Jail } from '../models/Houses/Jail.js';

export class GameController {

    static findPlayer(game, socket) {
        const player = game.players.find(player => player.id === socket.id);
        return player;
    }

    static findCurrentHouse(game, player) {
        const currentPosition = game.board.positions.find(p => p.pawn.player.id === player.id).position;
        const currentHouse = game.board.houses[currentPosition];
        return currentHouse;
    }

    static startBoard(io, socket, game) {
        
    }

    static rollDice(io, socket, game) {
        const player = this.findPlayer(game, socket)

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
                        jail.visit(player, game.bank, io);
                        io.emit('updatePositions', game.board.positions);
                        io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                        io.emit('playerArrested', { playerId: socket.id, message: `${player.name} foi preso por rolar três vezes o mesmo número.` });
                    } else {
                        game.board.movePawn(player, totalRoll);
                        const currentHouse = this.findCurrentHouse(game, player)
                        currentHouse.visit(player, game.bank, io);
                        io.emit('updatePositions', game.board.positions);
                        io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                        rollAndMove();
                    }
                } else {
                    player.double_counter = 0;
                    game.board.movePawn(player, totalRoll);
                    const currentHouse = this.findCurrentHouse(game, player);
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

    static bankPayment(io, socket, game, amount) {
        const player = this.findPlayer(game, socket);
        if (player) {
            game.bank.giveMoney(player, amount);
            io.emit('bankPaymentSuccess', { playerId: socket.id, amount });
        }
    }

    static bankCollection(io, socket, game, amount) {
        const player = this.findPlayer(game, socket);
        if (player) {
            if (game.bank.collectMoney(player, amount)) {
                io.emit('bankCollectionSuccess', { playerId: socket.id, amount });
            } else {
                io.emit('bankCollectionFailed', { playerId: socket.id, amount });
            }
        }
    }

    static buyProperty(io, socket, game) {
        const player = this.findPlayer(game, socket);
        if (player) {
            currentHouse = this.findCurrentHouse(game, player);
            if (currentHouse.buy(player, game.bank)) {
                io.emit('housePurchaseSuccess')
            } else {
                io.emit('housePurchaseFailed')
            }
        }
    }

    static buyHotel(io, socket, game) {
        const player = this.findPlayer(game, socket);
        if (player) {

        }
    }

    static buyLittleHouse(io, socket, game) {
        const player = this.findPlayer(game, socket);
        if (player) {
            currentHouse = this.findCurrentHouse(game, player);
            if (currentHouse.buyLittleHouse(player, game.bank)) {
                io.emit('littleHousePurchaseSuccess')
            } else {
                io.emit('littleHousePurchaseFailed')
            }
        }
    }
}

export default GameController;
