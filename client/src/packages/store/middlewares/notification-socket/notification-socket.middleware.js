import {
  SocketEvent,
  SocketNamespace,
  NotificationType,
  NotificationMessage,
  NotificationSocketEvent
} from 'libs/enums/enums';
import { socket } from 'packages/socket/socket';
import {
  appActionCreator,
  threadActionCreator,
  notificationActionCreator
} from 'packages/store/actions';

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
