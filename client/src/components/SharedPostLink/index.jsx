import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Icon } from 'semantic-ui-react';

import styles from './styles.module.scss';

class SharedPostLink extends React.Component {
    state = {
        copied: false
    };

    copyToClipboard = (e) => {
        this.input.select();
        document.execCommand('copy');
        e.target.focus();
        this.setState({ copied: true });
    };

    render() {
        const { postId, close } = this.props;
        const { copied } = this.state;
        return (
            <Modal open onClose={close}>
                <Modal.Header className={styles.header}>
                    <span>Share Post</span>
                    {copied && (
                        <span>
                            <Icon color="green" name="copy" />
                            Copied
                        </span>
                    )}
                </Modal.Header>
                <Modal.Content>
                    <Input
                        fluid
                        action={{ color: 'teal', labelPosition: 'right', icon: 'copy', content: 'Copy', onClick: this.copyToClipboard }}
                        value={`${window.location.origin}/share/${postId}`}
                        ref={(input) => { this.input = input; }}
                    />
                </Modal.Content>
            </Modal>
        );
    }
}

SharedPostLink.propTypes = {
    postId: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
};

export default SharedPostLink;
