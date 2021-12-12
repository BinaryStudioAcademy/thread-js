import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import { useEffect } from 'hooks/hooks';
import { ENV } from 'common/enums/enums';
import { userType } from 'common/prop-types/prop-types';

import 'react-notifications/lib/notifications.css';

const socket = io(ENV.SOCKET_URL);

const Notifications = ({ user, onPostApply }) => {
  useEffect(() => {
    if (!user) {
      return undefined;
    }
    const { id } = user;
    socket.emit('createRoom', id);
    socket.on('like', () => {
      NotificationManager.info('Your post was liked!');
    });
    socket.on('new_post', post => {
      if (post.userId !== id) {
        onPostApply(post.id);
      }
    });

    return () => {
      socket.close();
    };
  });

  return <NotificationContainer />;
};

Notifications.defaultProps = {
  user: undefined
};

Notifications.propTypes = {
  user: userType,
  onPostApply: PropTypes.func.isRequired
};

export default Notifications;
