// src/models/Player.js
export class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.money = 1500;
        this.in_jail = false;
        this.bankrupted = false;
        this.last_roll_value = 0;
        this.last_roll_double = false;
        this.double_counter = 0;
        this.cards = [];
        this.services = [];
        this.stations = [];
        this.residentials = [];
    }

    debit_money(amount) { }

    debit_money_forced(amount) { }

    receive_money(money) { }

    add_residential(residential) { }

    add_service(service) { }

    add_station(station) { }

    remove_residential(residential) { }

    remove_service(service) { }

    remove_station(station) { }

    use_card(card) { }

    be_arrested() { }

    get_out_of_jail() { }

    bankrupt() { }

    adjustMoney(amount) {
        this.money += amount;
    }
}