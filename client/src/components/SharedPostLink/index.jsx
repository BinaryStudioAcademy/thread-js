import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Icon } from 'semantic-ui-react';

import styles from './styles.module.scss';

const SharedPostLink = ({ postId, close }) => {
  const [copied, setCopied] = useState(false);
  let input = useRef();

  const copyToClipboard = e => {
    input.select();
    document.execCommand('copy');
    e.target.focus();
    setCopied(true);
  };

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
          action={{
            color: 'teal',
            labelPosition: 'right',
            icon: 'copy',
            content: 'Copy',
            onClick: copyToClipboard
          }}
          value={`${window.location.origin}/share/${postId}`}
          ref={ref => { input = ref; }}
        />
      </Modal.Content>
    </Modal>
  );
};

SharedPostLink.propTypes = {
  postId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default SharedPostLink;
