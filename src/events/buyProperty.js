// src/events/buyProperty.js
import { GameController } from '../controllers/GameController.js';

export function handleBuyProperty(io, socket, game) {
    socket.on('buyProperty', () => {
        GameController.buyProperty(io, socket, game);
    });
}