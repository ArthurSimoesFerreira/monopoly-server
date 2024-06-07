// src/events/buyHotel.js

export function handleBuyHotel(game, playerId, cost) {
    const player = game.players[playerId];
    if (player) {
        return game.bank.buyHotel(player, cost);
    }
    return false;
}
