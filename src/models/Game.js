// src/models/Game.js
import { Player } from './player.js'; // Importa a classe Player
import { Dice } from './Dice.js'; // Importa a classe Dice

export class Game {
    constructor() {
        this.players = {};
        this.dices = [new Dice(), new Dice()]; // Cria uma lista de dois dados
    }

    addPlayer(id, name) {
        this.players[id] = new Player(id, name); // Cria um novo jogador
    }

    removePlayer(id) {
        delete this.players[id]; // Remove um jogador existente
    }

    rollAllDice() {
        this.dices.forEach(dice => dice.roll()); // Rola todos os dados
        return this.dices.map(dice => dice.value); // Retorna os valores dos dados
    }
}
