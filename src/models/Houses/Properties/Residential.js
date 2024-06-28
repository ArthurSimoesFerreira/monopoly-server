import { Property } from "../Property.js";

export class Residential extends Property {
    constructor(propertyName, price, rent) {
        super(propertyName, price, rent);
        this.littleHouses = 0;
        this.L_house_price = 200;
        this.hotel = 0;
        this.hotel_price = 200;
        this.house_increment = 100
    }

    payRent(player, bank) {
        bank.transferMoney(player, this.owner, this.rent);
    }

    buyLittleHouse(player, bank, io) {
        if (bank.buyLittleHouse(player, this.L_house_price)) {
            this.littleHouses += 1;
            return true
        } else {
            return false
        }
    }

    sellLittleHouse(bank) {
        // Lógica de venda de casa
    }

    rentValue() {
        this.rent = this.rent + (this.house_increment * this.littleHouses)
    }

    visit(player, bank, io) {
        if (this.owner && this.owner != player) {
            this.payRent(player, bank)
        }
        else if (this.owner != player) {
            io.emit('noOwner', this.price);
        }
    }
}