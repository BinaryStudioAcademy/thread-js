import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

class Notifications extends React.Component {
    socket = undefined;

    componentDidMount() {
        this.initSocket();
    }


    componentDidUpdate() {
        this.initSocket();
    }

    addSocketHandlers = (userId) => {
        this.socket.emit('createRoom', userId);
        this.socket.on('like', () => {
            NotificationManager.info('Your post was liked!');
        });
        this.socket.on('new_post', (post) => {
            if (post.userId !== userId) {
                this.props.applyPost(post.id);
            }
        });
    }

    initSocket() {
        const { user } = this.props;
        if (!this.socket && user && user.id) {
            this.socket = io('http://localhost:3002');
            this.addSocketHandlers(user.id);
        }
    }

    render() {
        return <NotificationContainer />;
    }
}

Notifications.defaultProps = {
    user: {}
};

Notifications.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    applyPost: PropTypes.func.isRequired,
};

export default Notifications;
