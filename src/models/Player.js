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

    debitMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }

    debitMoneyForced(amount) {
        this.money -= amount;
        return this.money >= 0;
    }

    receiveMoney(money) {
        this.money += money;
    }

    addResidential(residential) {
        this.residentials.push(residential);
    }

    addService(service) {
        this.services.push(service);
    }

    addStation(station) {
        this.stations.push(station);
    }

    removeResidential(residential) {
        const index = this.residentials.indexOf(residential);
        if (index !== -1) {
            this.residentials.splice(index, 1);
        }
    }

    removeService(service) {
        const index = this.services.indexOf(service);
        if (index !== -1) {
            this.services.splice(index, 1);
        }
    }

    removeStation(station) {
        const index = this.stations.indexOf(station);
        if (index !== -1) {
            this.stations.splice(index, 1);
        }
    }

    useCard(card) {
        // Lógica para usar uma carta
    }

    beArrested() {
        this.in_jail = true;
    }

    getOutOfJail() {
        this.in_jail = false;
    }

    bankrupt() {
        this.bankrupted = true;
        // Lógica adicional para falência
    }

    adjustMoney(amount) {
        this.money += amount;
    }
}
