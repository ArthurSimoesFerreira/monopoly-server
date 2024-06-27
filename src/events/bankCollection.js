// src/events/bankCollection.js
import { GameController } from '../controllers/GameController.js';

export function handleBankCollection(io, socket, game) {
    socket.on('bankCollection', (amount) => {
        GameController.bankCollection(io, socket, game, amount);
    });
}
