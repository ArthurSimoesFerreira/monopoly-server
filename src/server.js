// src/server/index.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocketEvents } from './events/index.js';
import { Game } from './models/Game.js';
import GameController from './controllers/GameController.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());

const game = Game.getInstance();

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    setupSocketEvents(io, socket, game);

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        GameController.playerDisconnect(io, socket, game);
    });
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(game)
    GameController.intializeBoard(io, game);
});
