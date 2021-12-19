import PropTypes from 'prop-types';
import { useState, useRef } from 'hooks/hooks';
import { IconName, IconColor } from 'common/enums/enums';
import { CopyBufferInput, Icon, Modal } from 'components/common/common';

import styles from './styles.module.scss';

const SharedPostLink = ({ postId, close }) => {
  const [isCopied, setIsCopied] = useState(false);
  const input = useRef();

  const copyToClipboard = ({ target }) => {
    navigator.clipboard.writeText(input.current?.value ?? '');
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
        <CopyBufferInput
          onCopy={copyToClipboard}
          value={`${window.location.origin}/share/${postId}`}
          ref={input}
        />
      </Modal.Content>
    </Modal>
  );
};

SharedPostLink.propTypes = {
  postId: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired
};

export default SharedPostLink;
