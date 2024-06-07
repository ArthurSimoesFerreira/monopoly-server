// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocketEvents } from './events/index.js';
import { Game } from './models/Game.js';

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
}));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const game = new Game();

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    setupSocketEvents(io, socket, game);

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        game.removePlayer(socket.id); // Remove o jogador ao desconectar
        io.emit('playerUpdate', game.players);
    });
});

app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Conectado na porta *:${PORT}`);
});
