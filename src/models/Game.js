// src/models/Game.js
import { Player } from './Player.js';
import { Dice } from './Dice.js';
import { Bank } from './Bank.js';
import { Board } from './Board.js';

export class Game {
    constructor() {
        this.players = {};
        this.dice = [new Dice(), new Dice()];
        this.bank = new Bank();
        this.board = new Board();
    }

    addPlayer(id, name) {
        this.players[id] = new Player(id, name);
    }

    removePlayer(id) {
        delete this.players[id];
    }

    rollAllDice() {
        this.dice.forEach(die => die.roll());
        return this.dice.map(die => die.value);
    }

    handleTransaction(senderId, receiverId, amount) {
        const sender = this.players[senderId];
        const receiver = this.players[receiverId];
        if (sender && receiver) {
            return this.bank.transferMoney(sender, receiver, amount);
        }
        return false;
    }

    handleBankPayment(playerId, amount) {
        const player = this.players[playerId];
        if (player) {
            this.bank.giveMoney(player, amount);
        }
    }

    handleBankCollection(playerId, amount) {
        const player = this.players[playerId];
        if (player) {
            return this.bank.collectMoney(player, amount);
        }
        return false;
    }

    handleBuyHouse(playerId, cost) {
        const player = this.players[playerId];
        if (player) {
            return this.bank.buyHouse(player, cost);
        }
        return false;
    }

    handleBuyHotel(playerId, cost) {
        const player = this.players[playerId];
        if (player) {
            return this.bank.buyHotel(player, cost);
        }
        return false;
    }
}
