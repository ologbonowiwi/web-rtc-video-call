const socket = io(); // io is a global variable
const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

const peers = {};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

const processStream = stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream);

    const video = document.createElement('video');

    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    })
  });
}

socket.on('user-disconnected', userId => {
  peers[userId]?.close?.();
})

navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  addVideoStream(myVideo, stream)

  socket.on('user-connected', (userId) => {
    setTimeout(connectToNewUser, 1000, userId, stream);
    // connectToNewUser(userId, stream);
  });

  myPeer.on('call', call => {
    call.answer(stream);

    const video = document.createElement('video');

    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    })
  });
})

// Peer is a global variable
const myPeer = new Peer(undefined, { // undefined is a random ID
  host: '/',
  port: '3001',
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})

const connectToNewUser = (userId, stream) => {
  const call = myPeer.call(userId, stream);

  const video = document.createElement('video');
  video.setAttribute('id', userId);

  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  });

  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
}

