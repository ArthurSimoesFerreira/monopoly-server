// src/events/rollDice.js
export function handleRollDice(io, socket, game) {
    socket.on('rollDice', () => {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        const player = game.players[socket.id];

        if (player) {
            player.move(diceRoll);
            io.emit('diceResult', { playerId: socket.id, diceRoll, newPosition: player.position });
        }
    });
}
