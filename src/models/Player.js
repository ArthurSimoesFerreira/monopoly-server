// src/models/Player.js
export class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.position = 0;
        this.money = 1500;
    }

    move(spaces) {
        this.position = (this.position + spaces) % 40;
    }

    adjustMoney(amount) {
        this.money += amount;
    }
}