import { randomUUID } from "crypto";
import express from "express";
import { Server } from "http";
import { Server as SocketIoServer } from "socket.io";
import { PORT } from "./config.js";

const app = express();

const server = new Server(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${randomUUID()}`)
});

app.get('/:roomId', (req, res) => {
  const { roomId } = req.params;

  res.render('room', { roomId });
})

const io = new SocketIoServer(server);

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);

    socket.to(roomId).emit('user-connected', userId);
  });
});

server.listen(PORT);
 