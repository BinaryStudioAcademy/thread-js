import { Server as SocketServer } from 'socket.io';

import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';

class SocketService {
  #io;

  get io() {
    return this.#io;
  }

  initializeIo = server => {
    this.#io = new SocketServer(server);
    this.#io
      .of(SocketNamespace.NOTIFICATION)
      .on(SocketEvent.CONNECTION, this.#notificationHandler);
  };

  #notificationHandler = socket => {
    socket.on(SocketEvent.NOTIFICATION_JOIN_ROOM, roomId => {
      socket.join(roomId);
    });

    socket.on(SocketEvent.NOTIFICATION_LEAVE_ROOM, roomId => {
      socket.leave(roomId);
    });
  };
}

export { SocketService };
