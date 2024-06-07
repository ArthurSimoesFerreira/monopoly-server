// src/events/rollDice.js
export function handleRollDice(io, socket, game) {
    socket.on('rollDice', () => {
        const player = game.players[socket.id];
        const diceValues = game.rollAllDice(); // Rola todos os dados

        const totalRoll = diceValues.reduce((a, b) => a + b, 0); // Calcula a soma dos valores dos dados

        if (player) {
            player.move(totalRoll);
            io.emit('diceResult', { // Envia uma mensagem para todos os clientes
                playerId: socket.id,
                diceValues,
                totalRoll
            });
        }
    });
}
