const socket = io(); // io is a global variable

socket.emit('join-room', ROOM_ID, 10);
