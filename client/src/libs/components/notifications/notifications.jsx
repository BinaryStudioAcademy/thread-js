import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useDispatch } from 'libs/hooks/hooks';
import { actions as notificationActionCreator } from 'slices/notifications/notifications';
import { userType } from 'libs/prop-types/prop-types';

const Notifications = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return undefined;
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
