// src/events/playerConnection.js
export function handlePlayerConnection(io, socket, game) {
    socket.on('playerConnect', (playerName) => {
        const newPlayer = { id: socket.id, name: playerName, position: 0, money: 1500 };
        game.players[socket.id] = newPlayer;
        io.emit('playerUpdate', game.players);
    });

    socket.on('disconnect', () => {
        delete game.players[socket.id];
        io.emit('playerUpdate', game.players);
    });
}
