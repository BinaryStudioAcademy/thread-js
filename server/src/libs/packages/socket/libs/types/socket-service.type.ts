import { type Server } from 'node:http';

type SocketService = {
  initializeIo(_server: Server): void;
};

export { type SocketService };
