import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// Configuração do CORS para permitir solicitações do front-end
app.use(cors({
    origin: "http://localhost:3000", // Endereço do seu front-end
    methods: ["GET", "POST"]
}));

// Inicialização do Socket.IO com suporte a CORS
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Endereço do seu front-end
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // Emissão de um evento de saudação quando um usuário se conecta
    socket.emit('message', 'Welcome to the Monopoly game!');

    // Tratamento de eventos personalizados aqui
    socket.on('rollDice', () => {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        io.emit('diceResult', { id: socket.id, diceRoll });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
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
