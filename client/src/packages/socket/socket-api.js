import { io } from 'socket.io-client';

class Socket {
  getInstance = namespace => io(namespace);
}

export { Socket };
