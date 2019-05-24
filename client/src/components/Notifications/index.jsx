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

    componentDidUpdate(prevProps) {
        this.initSocket();
        this.checkLoggedInUser(prevProps);
    }

    checkLoggedInUser = (prevProps) => {
        if (this.socket && !this.props.user && this.props.user !== prevProps.user) {
            this.socket.emit('leaveRoom', prevProps.user.id);
        }
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
            const { REACT_APP_SOCKET_SERVER, REACT_APP_SOCKET_SERVER_PORT } = process.env;
            const address = `http://${REACT_APP_SOCKET_SERVER}:${REACT_APP_SOCKET_SERVER_PORT}`;
            this.socket = io(address);
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
