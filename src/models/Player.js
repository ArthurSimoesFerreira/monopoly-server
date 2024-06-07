// src/models/Player.js
export class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.money = 1500;
        this.properties = 0;
        this.services = 0;
        this.cards = 0;
        this.stations = 0;
        this.arrested = false;
        this.broke = false;
    }

    adjustMoney(amount) {
        this.money += amount;
    }
}