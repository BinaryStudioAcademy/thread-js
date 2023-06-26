import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { useDispatch, useEffect } from '~/libs/hooks/hooks.js';
import { userType } from '~/libs/prop-types/property-types.js';
import { actions as notificationActionCreator } from '~/slices/notifications/notifications.js';

const Notifications = ({ user }) => {
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

Notifications.defaultProps = {
  user: undefined
};

Notifications.propTypes = {
  user: userType
};

export { Notifications };
