import socketio from 'socket.io';
import express, { response } from 'express';
import http, { request } from 'http';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.get('/', (req, res) => res.send('Hello World"'));

const port = 4000
server.listen(port, () => console.log(`App listening on port ${port}`));