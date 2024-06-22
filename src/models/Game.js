// src/models/Game.js
import { Player } from './Player.js';
import { Dice } from './Dice.js';
import { Bank } from './Bank.js';
import { Board } from './Board.js';

export class Game {
    static instance = null;

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }

        return Game.instance;
    }

    constructor() {
        if (Game.instance) {
            throw new Error("This class is a Singleton!");
        }

        this.players = {};
        this.dice = [new Dice(), new Dice()];
        this.bank = new Bank();
        this.board = Board.get_instance();
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

}
