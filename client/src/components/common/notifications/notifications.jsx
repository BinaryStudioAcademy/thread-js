import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useEffect } from 'hooks/hooks';
import { ENV, NotificationMessage, SocketEvent } from 'common/enums/enums';
import { userType } from 'common/prop-types/prop-types';

const socket = io(ENV.SOCKET_URL);

const Notifications = ({ user, onPostApply }) => {
  useEffect(() => {
    if (!user) {
      return undefined;
    }
    const { id } = user;
    socket.emit(SocketEvent.CREATE_ROOM, id);
    socket.on(SocketEvent.LIKE, () => {
      NotificationManager.info(NotificationMessage.LIKED_POST);
    });
    socket.on(SocketEvent.NEW_POST, post => {
      if (post.userId !== id) {
        onPostApply(post.id);
      }
    });

    return () => {
      socket.emit(SocketEvent.LEAVE_ROOM, id);
      socket.removeAllListeners();
    };
  }, [user, onPostApply]);

  return <NotificationContainer />;
};

Notifications.defaultProps = {
  user: undefined
};

Notifications.propTypes = {
  user: userType,
  onPostApply: PropTypes.func.isRequired
};

export { Notifications };
