// src/models/Game.js
export class Game {
    constructor() {
        this.players = {};
    }

    addPlayer(id, name) {
        this.players[id] = new Player(id, name);
    }

    removePlayer(id) {
        delete this.players[id];
    }
}
