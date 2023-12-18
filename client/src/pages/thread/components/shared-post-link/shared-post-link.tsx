import { CopyBufferInput } from '~/libs/components/copy-buffer-input/copy-buffer-input.js';
import { Icon } from '~/libs/components/icon/icon.js';
import { Modal } from '~/libs/components/modal/modal.js';
import { IconColor, IconName } from '~/libs/enums/enums.js';
import { useCallback, useRef, useState } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  postId: number;
  onClose: () => void;
};

const SharedPostLink: React.FC<Properties> = ({ postId, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  const handleCopy: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async ({ target }) => {
      await navigator.clipboard.writeText(input.current?.value ?? '');
      (target as HTMLInputElement).focus();

      setIsCopied(true);
    },
    []
  );

  return (
    <Modal isOpen isCentered onClose={onClose}>
      <header className={styles['header']}>
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

export { SharedPostLink };
