import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Notifications = ({ user, applyPost }) => {
  const { REACT_APP_SOCKET_SERVER: address } = process.env;
  const [socket] = useState(io(address));

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
        applyPost(post.id);
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
  user: PropTypes.objectOf(PropTypes.any),
  applyPost: PropTypes.func.isRequired
};

export default Notifications;
