import { House } from "../House.js";
export class TaxHouse extends House {
    constructor(price){
        super()
        this.price = price;
    }
    visit(player, bank, io) {
        if((bank.collectMoney(player, this.price))){ 
            io.emit('noMoney')
        }
    }
}