// src/events/index.js
import { handleRollDice } from './rollDice.js';
import { handlePlayerConnection } from './playerConnection.js';

export function setupSocketEvents(io, socket, game) {
    handleRollDice(io, socket, game);
    handlePlayerConnection(io, socket, game);
}
