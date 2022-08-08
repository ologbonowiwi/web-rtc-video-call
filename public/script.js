const socket = io(); // io is a global variable

// Peer is a global variable
const myPeer = new Peer(undefined, { // undefined is a random ID
  host: '/',
  port: '3001',
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})

