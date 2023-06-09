import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useEffect } from 'libs/hooks/hooks';
import { userType } from 'libs/prop-types/property-types';
import { ToastContainer } from 'react-toastify';
import { actions as notificationActionCreator } from 'slices/notifications/notifications';

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
