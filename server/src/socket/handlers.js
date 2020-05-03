export default socket => {
  socket.on('createRoom', roomId => {
    socket.join(roomId);
  });
  socket.on('leaveRoom', roomId => {
    socket.leave(roomId);
  });
};
