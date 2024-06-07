// src/events/transaction.js

export function handleTransaction(game, senderId, receiverId, amount) {
    const sender = game.players[senderId];
    const receiver = game.players[receiverId];
    if (sender && receiver) {
        return game.bank.transferMoney(sender, receiver, amount);
    }
    return false;
}
