// src/events/playerConnection.js
import { GameController } from '../controllers/GameController.js';

export function handlePlayerConnection(io, socket, game) {
    socket.on('playerConnect', (playerName) => {
        GameController.playerConnect(io, socket, game, playerName);
    });

    socket.on('disconnect', () => {
        GameController.playerDisconnect(io, socket, game);
    });
}
