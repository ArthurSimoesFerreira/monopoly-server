// src/server/events/rollDice.js
import GameController from "../controllers/GameController.js";

export function handleRollDice(io, socket, game) {
    socket.on('rollDice', () => {
        GameController.rollDice(io, socket, game);
    });
}
