import { Property } from "../Property";

export class Station extends Property {
    constructor(propertyName, owner, price, rent) {
        super(propertyName, owner, price, rent);
    }

    rent_value() { }

    pay_rent(player, bank) { }

    visit(player, bank) { }
}