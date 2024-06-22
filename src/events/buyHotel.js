// src/events/buyHotel.js
import { GameController } from '../controllers/GameController.js';

export function handleBuyHotel(io, socket, game) {
    socket.on('buyHotel', ({ playerId, cost }) => {
        GameController.handleBuyHotel(io, socket, game, playerId, cost);
    });
}
