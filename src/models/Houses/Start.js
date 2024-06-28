import { House } from "../House.js";

export class Start extends House {
    constructor(price) {
        super()
        this.price = price
    }
    visit(player, bank, io) {
        bank.giveMoney(player, this.price)
    }
}