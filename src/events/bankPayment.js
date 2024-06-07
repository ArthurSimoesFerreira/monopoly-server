// src/events/bankPayment.js

export function handleBankPayment(game, playerId, amount) {
    const player = game.players[playerId];
    if (player) {
        game.bank.giveMoney(player, amount);
    }
}
