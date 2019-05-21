export default (socket) => {
    socket.on('createRoom', (roomId) => {
        socket.join(roomId);
    });
};
