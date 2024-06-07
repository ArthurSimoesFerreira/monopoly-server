// src/models/Game.js
import { Dice } from './Dice.js'; // Importa a classe Dice

export class Game {
    constructor() {
        this.players = {};
        this.dices = [new Dice(), new Dice()]; // Cria uma lista de dois dados
    }

    addPlayer(id, name) {
        this.players[id] = new Player(id, name);
    }

    removePlayer(id) {
        delete this.players[id];
    }

    rollAllDice() {
        this.dices.forEach(dice => dice.roll());
        return this.dices.map(dice => dice.value);
    }
}
