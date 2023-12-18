/* eslint-disable unicorn/prefer-regexp-test */
import { type Middleware } from '@reduxjs/toolkit';

import {
  NotificationMessage,
  NotificationSocketEvent,
  NotificationType
} from '~/libs/packages/notification/libs/enums/enums.js';
import { type AppDispatch } from '~/libs/types/types.js';
import { type Post } from '~/packages/post/post.js';
import {
  SocketEvent,
  SocketNamespace
} from '~/packages/socket/libs/enums/enums.js';
import { socket } from '~/packages/socket/socket.js';
import { actions as appActionCreator } from '~/slices/app/app.js';
import { actions as notificationActionCreator } from '~/slices/notifications/notifications.js';
import { actions as threadActionCreator } from '~/slices/thread/thread.js';

const notificationSocketInstance = socket.getInstance(
  SocketNamespace.NOTIFICATION
);

const notificationSocket: Middleware<unknown, unknown, AppDispatch> = ({
  dispatch
}) => {
  notificationSocketInstance.on(NotificationSocketEvent.LIKE_POST, () => {
    void dispatch(
      appActionCreator.notify({
        type: NotificationType.INFO,
        message: NotificationMessage.LIKED_POST
      })
    );
  });
  notificationSocketInstance.on(
    NotificationSocketEvent.NEW_POST,
    (post: Post) => {
      void dispatch(threadActionCreator.applyPost(post));
    }
  );

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
