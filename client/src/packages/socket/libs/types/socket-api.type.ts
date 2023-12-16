import { type Socket as LibrarySocket } from 'socket.io-client';

type SocketApi = {
  getInstance(namespace: string): LibrarySocket;
};

export { type SocketApi };
