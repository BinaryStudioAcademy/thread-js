import { type Server } from 'node:http';

import { type Socket as TSocket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';

import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';
import { type SocketService } from './libs/types/types.js';

class Socket implements SocketService {
  #io!: SocketServer;

  public get io(): SocketServer {
    return this.#io;
  }

  public initializeIo = (server: Server): void => {
    this.#io = new SocketServer(server);
    this.#io
      .of(SocketNamespace.NOTIFICATION)
      .on(SocketEvent.CONNECTION, this.#notificationHandler);
  };

  #notificationHandler = (socket: TSocket): void => {
    socket.on(SocketEvent.NOTIFICATION_JOIN_ROOM, (roomId: string) => {
      void socket.join(roomId);
    });

    socket.on(SocketEvent.NOTIFICATION_LEAVE_ROOM, (roomId: string) => {
      void socket.leave(roomId);
    });
  };
}

export { Socket };
