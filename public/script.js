const socket = io(); // io is a global variable
const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  addVideoStream(myVideo, stream)
})

// Peer is a global variable
const myPeer = new Peer(undefined, { // undefined is a random ID
  host: '/',
  port: '3001',
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})

