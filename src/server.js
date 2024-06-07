import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; // Biblioteca para comunicação em tempo real
import cors from 'cors'; // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
import { setupSocketEvents } from './events/index.js'; // Importa a configuração dos eventos de Socket.IO
import { Game } from './models/Game.js'; // Importa a classe Game que gerencia o estado do jogo

const app = express();
const server = http.createServer(app);

// Configuração do CORS para permitir solicitações do front-end
app.use(cors({
    origin: "http://localhost:3000", // Endereço do front-end
    methods: ["GET", "POST"] // Métodos permitidos
}));

// Inicializa o servidor Socket.IO com suporte a CORS
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Cria uma nova instância do jogo
const game = new Game();

// Configura o evento de conexão do Socket.IO
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // Configura os eventos personalizados para o socket
    setupSocketEvents(io, socket, game);

    // Configura o evento de desconexão do socket
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        game.removePlayer(socket.id);
        io.emit('playerUpdate', game.players); // Emite uma atualização para todos os clientes
    });
});

app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Define a porta do servidor
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Conectado na porta *:${PORT}`);
});
