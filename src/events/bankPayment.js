// src/events/bankPayment.js
import { GameController } from '../controllers/GameController.js';

export function handleBankPayment(io, socket, game) {
    socket.on('bankPayment', ({ playerId, amount }) => {
        GameController.handleBankPayment(io, socket, game, playerId, amount);
    });
}
