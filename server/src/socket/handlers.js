import { SocketEvent } from '../common/enums/enums.js';

const handlers = socket => {
  socket.on(SocketEvent.CREATE_ROOM, roomId => {
    socket.join(roomId);
  });
  socket.on(SocketEvent.LEAVE_ROOM, roomId => {
    socket.leave(roomId);
  });
};

export { handlers };
