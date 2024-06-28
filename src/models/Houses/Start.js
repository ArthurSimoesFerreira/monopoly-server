import { House } from "../House";

export class Start extends House {
    constructor(price){
        this.price = price
    }
    visit(player, bank, io) {
        bank.giveMoney(player, this.price)
    }
}