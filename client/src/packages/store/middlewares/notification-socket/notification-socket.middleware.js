import {
  SocketEvent,
  SocketNamespace
} from 'packages/socket/libs/enums/enums.js';
import {
  NotificationType,
  NotificationMessage,
  NotificationSocketEvent
} from 'packages/notification/libs/enums/enums.js';
import { socket } from 'packages/socket/socket';
import { actions as appActionCreator } from 'slices/app/app.js';
import { actions as threadActionCreator } from 'slices/thread/thread.js';
import { actions as notificationActionCreator } from 'slices/notifications/notifications.js';

const notificationSocketInstance = socket.getInstance(
  SocketNamespace.NOTIFICATION
);

const notificationSocket = ({ dispatch }) => {
  notificationSocketInstance.on(NotificationSocketEvent.LIKE_POST, () => {
    dispatch(
      appActionCreator.notify({
        type: NotificationType.INFO,
        message: NotificationMessage.LIKED_POST
      })
    );
  });
  notificationSocketInstance.on(NotificationSocketEvent.NEW_POST, post => {
    dispatch(threadActionCreator.applyPost(post));
  });

  return next => action => {
    if (notificationActionCreator.joinRoom.match(action)) {
      notificationSocketInstance.emit(
        SocketEvent.NOTIFICATION_JOIN_ROOM,
        `${action.payload}`
      );
    }

    if (notificationActionCreator.leaveRoom.match(action)) {
      notificationSocketInstance.emit(
        SocketEvent.NOTIFICATION_LEAVE_ROOM,
        `${action.payload}`
      );
    }

    return next(action);
  };
};

export { notificationSocket };
