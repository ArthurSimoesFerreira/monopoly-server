// src/models/Bank.js

export class Bank {
    constructor() {
        this.availableHouses = 32;
        this.availableHotels = 12;
    }

    transferMoney(sender, receiver, amount) {
        if (sender.money >= amount) {
            sender.adjustMoney(-amount);
            receiver.adjustMoney(amount);
            return true;
        }
        return false;
    }

    giveMoney(player, amount) {
        player.adjustMoney(amount);
    }

    collectMoney(player, amount) {
        if (player.money >= amount) {
            player.adjustMoney(-amount);
            return true;
        }
        return false;
    }

    transferToAll(player, amount, players) {
        if (player.money >= amount * players.length) {
            players.forEach(p => this.transferMoney(player, p, amount));
            return true;
        }
        return false;
    }

    collectFromAll(player, amount, players) {
        let allPaid = true;
        players.forEach(p => {
            if (!this.transferMoney(p, player, amount)) {
                allPaid = false;
            }
        });
        return allPaid;
    }

    buyHouse(player, cost) {
        if (this.availableHouses > 0 && player.money >= cost) {
            player.adjustMoney(-cost);
            this.availableHouses -= 1;
            return true;
        }
        return false;
    }

    buyHotel(player, cost) {
        if (this.availableHotels > 0 && player.money >= cost) {
            player.adjustMoney(-cost);
            this.availableHotels -= 1;
            return true;
        }
        return false;
    }
}
