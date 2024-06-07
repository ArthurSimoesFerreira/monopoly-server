// src/events/bankCollection.js

export function handleBankCollection(game, playerId, amount) {
    const player = game.players[playerId];
    if (player) {
        return game.bank.collectMoney(player, amount);
    }
    return false;
}
