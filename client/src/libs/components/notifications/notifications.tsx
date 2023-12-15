import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { useDispatch, useEffect } from '~/libs/hooks/hooks.js';
import { actions as notificationActionCreator } from '~/slices/notifications/notifications.js';
import { User } from '~/libs/types/types.js';

type NotificationsProps = {
  user: User
};

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const dispatch = useDispatch();

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
