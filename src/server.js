import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocketEvents } from './events/index.js';
import { Game } from './models/Game.js';

const app = express();
const server = http.createServer(app);

// Configuração do CORS para permitir solicitações do front-end
app.use(cors({
    origin: "http://localhost:3000", // Endereço do front-end
    methods: ["GET", "POST"]
}));

// Inicialização do Socket.IO com suporte a CORS
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Endereço do front-end
        methods: ["GET", "POST"]
    }
});

const game = new Game();

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    setupSocketEvents(io, socket, game);

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        game.removePlayer(socket.id);
        io.emit('playerUpdate', game.players);
    });
});

// Rota básica para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});