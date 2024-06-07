export class Property {
    constructor(propertyName, owner, price, rent) {
        this.property_name = propertyName;
        this.owner = owner;
        this.price = price;
        this.rent = rent;
    }

    buy(player, bank) { }

    sell(player, bank) { }

    auction() { }

    has_owner() { }

    pay_rent(player, bank) { }

    visit(player) { }

    set_owner(player) { }
}