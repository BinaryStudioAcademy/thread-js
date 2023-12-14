const SocketEvent = {
  CONNECTION: 'connection',
  NOTIFICATION_JOIN_ROOM: 'notification-join-room',
  NOTIFICATION_LEAVE_ROOM: 'notification-leave-room'
} as const;

export { SocketEvent };
