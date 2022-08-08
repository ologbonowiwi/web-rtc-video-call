import express from "express";
import { Server } from "http";
import { Server as SocketIoServer } from "socket.io";
import { PORT } from "./config.js";

const app = express();

const server = new Server(app);

const io = new SocketIoServer(server);

server.listen(PORT);
