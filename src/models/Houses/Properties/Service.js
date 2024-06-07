import { Property } from "../Property";

export class Service extends Property {
    constructor(propertyName, owner, price, rent) {
        super(propertyName, owner, price, rent);
    }

    rent_value() { }

    pay_rent(player, bank) { }

    visit(player, bank) { }
}