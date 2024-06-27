// src/events/bankPayment.js
import { GameController } from '../controllers/GameController.js';

export function handleBankPayment(io, socket, game) {
    socket.on('bankPayment', (amount) => {
        GameController.bankPayment(io, socket, game, playerId, amount);
    });
}
