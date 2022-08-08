import { randomUUID } from "crypto";
import express from "express";
import { Server } from "http";
import { Server as SocketIoServer } from "socket.io";
import { PORT } from "./config.js";

const app = express();

const server = new Server(app);

const io = new SocketIoServer(server);

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log('{ roomId, userId } :>> ', { roomId, userId });
  });
});

server.listen(PORT);
