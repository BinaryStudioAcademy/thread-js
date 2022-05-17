import PropTypes from 'prop-types';
import { useState, useRef } from 'hooks/hooks.js';
import { IconName, IconColor } from 'common/enums/enums.js';
import { CopyBufferInput, Icon, Modal } from 'components/common/common.js';

import styles from './styles.module.scss';

const SharedPostLink = ({ postId, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const input = useRef();

  const handleCopy = ({ target }) => {
    navigator.clipboard.writeText(input.current?.value ?? '');
    target.focus();
    setIsCopied(true);
  };

  return (
    <Modal isOpen isCentered onClose={onClose}>
      <header className={styles.header}>
        <span>Share Post</span>
        {isCopied && (
          <span>
            <Icon name={IconName.COPY} color={IconColor.GREEN} />
            Copied
          </span>
        )}
      </header>
      <div>
        <CopyBufferInput
          onCopy={handleCopy}
          value={`${window.location.origin}/share/${postId}`}
          ref={input}
        />
      </div>
    </Modal>
  );
};

SharedPostLink.propTypes = {
  postId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
};

export { SharedPostLink };
