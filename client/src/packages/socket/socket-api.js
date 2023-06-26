import { io } from 'socket.io-client';

class Socket {
  getInstance = namespace => {
    return io(namespace, {
      transports: ['websocket']
    });
  };
}

export { Socket };
