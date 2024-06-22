// src/events/buyHouse.js
import { GameController } from '../controllers/GameController.js';

export function handleBuyHouse(io, socket, game) {
    socket.on('buyHouse', ({ playerId, cost }) => {
        GameController.handleBuyHouse(io, socket, game, playerId, cost);
    });
}