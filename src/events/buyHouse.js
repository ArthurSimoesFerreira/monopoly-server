// src/events/buyHouse.js

export function handleBuyHouse(game, playerId, cost) {
    const player = game.players[playerId];
    if (player) {
        return game.bank.buyHouse(player, cost);
    }
    return false;
}
