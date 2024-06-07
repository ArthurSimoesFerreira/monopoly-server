export class Residential extends Property {
    constructor(propertyName, owner, price, rent) {
        super(propertyName, owner, price, rent);
        this.houses = 0;
        this.hotel = false;
    }

    pay_rent(player, bank) { }

    buy_house(bank) { }

    sell_house(bank) { }

    rent_value() { }

    visit(player, bank) { }
}