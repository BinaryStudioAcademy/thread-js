import * as React from 'react';
import PropTypes from 'prop-types';
import { IconName, IconColor } from 'src/common/enums/enums';
import { Icon, Modal, Input } from 'src/components/common/common';

import styles from './styles.module.scss';

const SharedPostLink = ({ postId, close }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  let input = React.useRef();

  const copyToClipboard = ({ target }) => {
    input.select();
    document.execCommand('copy');
    target.focus();
    setIsCopied(true);
  };

  return (
    <Modal open onClose={close}>
      <Modal.Header className={styles.header}>
        <span>Share Post</span>
        {isCopied && (
          <span>
            <Icon name={IconName.COPY} color={IconColor.GREEN} />
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
          ref={ref => {
            input = ref;
          }}
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
