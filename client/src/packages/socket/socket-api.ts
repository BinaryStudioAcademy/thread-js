import { io, type Socket as LibrarySocket } from 'socket.io-client';

import { type SocketApi } from './libs/types/types.js';

class Socket implements SocketApi {
  public getInstance = (namespace: string): LibrarySocket => {
    return io(namespace, {
      transports: ['websocket']
    });
  };
}

export { Socket };
