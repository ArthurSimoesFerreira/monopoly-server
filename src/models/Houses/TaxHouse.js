import { House } from "../House";
export class TaxHouse extends House {
    constructor(price){
        this.price = price;
    }
    visit(player, bank, io) {
        if((bank.collectMoney(player, this.price))){ 
            io.emit('noMoney')
        }
    }
}