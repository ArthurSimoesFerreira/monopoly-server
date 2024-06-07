// src/models/Dice.js

export class Dice {
    constructor() {
        this.value = 0;
    }

    roll() {
        this.value = Math.floor(Math.random() * 6) + 1;
    }
}
