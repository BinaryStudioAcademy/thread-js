import { Socket as SocketService } from './socket.service.js';

const socketService = new SocketService();

export { socketService };
export {
  NotificationSocketEvent,
  SocketEvent,
  SocketNamespace
} from './libs/enums/enums.js';
export { type SocketService } from './libs/types/types.js';
