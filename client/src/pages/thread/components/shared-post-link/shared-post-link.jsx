import PropTypes from 'prop-types';

import { CopyBufferInput } from '~/libs/components/copy-buffer-input/copy-buffer-input';
import { Icon } from '~/libs/components/icon/icon';
import { Modal } from '~/libs/components/modal/modal';
import { IconColor, IconName } from '~/libs/enums/enums.js';
import { useCallback, useRef, useState } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const SharedPostLink = ({ postId, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const input = useRef();

  const handleCopy = useCallback(({ target }) => {
    navigator.clipboard.writeText(input.current?.value ?? '');
    target.focus();
    setIsCopied(true);
  }, []);

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
