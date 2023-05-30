import 'react-notifications/lib/notifications.css';

import { useDispatch, useEffect } from 'libs/hooks/hooks';
import { userType } from 'libs/prop-types/property-types';
import { NotificationContainer } from 'react-notifications';
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

  return <NotificationContainer />;
};

Notifications.defaultProps = {
  user: undefined
};

Notifications.propTypes = {
  user: userType
};

export { Notifications };
