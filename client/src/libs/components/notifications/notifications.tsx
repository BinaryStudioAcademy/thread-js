import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { useAppDispatch, useEffect } from '~/libs/hooks/hooks.js';
import { type UserWithImageRelation } from '~/packages/user/user.js';
import { actions as notificationActionCreator } from '~/slices/notifications/notifications.js';

type NotificationsProperties = {
  user: UserWithImageRelation | null;
};

const Notifications: React.FC<NotificationsProperties> = ({ user }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    const { id } = user;

    dispatch(notificationActionCreator.joinRoom(id));

    return () => {
      dispatch(notificationActionCreator.leaveRoom(id));
    };
  }, [user, dispatch]);

  return <ToastContainer />;
};

export { Notifications };
