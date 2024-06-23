// src/events/transaction.js
import { GameController } from '../controllers/GameController.js';

export function handleTransaction(io, socket, game) {
    socket.on('transaction', ({ senderId, receiverId, amount }) => {
        GameController.transaction(io, socket, game, senderId, receiverId, amount);
    });
}
