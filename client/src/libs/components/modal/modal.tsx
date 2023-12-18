/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { type ReactNode } from 'react';

import { Portal } from '../portal/portal.js';
import { useModal } from './hooks/hooks.js';
import styles from './styles.module.scss';

type ModalProperties = {
  isCentered?: boolean;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProperties> = ({
  isOpen,
  isCentered,
  onClose,
  children
}) => {
  const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
    onClose
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={clsx(styles['modal'], isCentered && styles['centered'])}
        onClick={handleOutsideClick}
        role="button"
        tabIndex={0}
      >
        <div
          className={styles['content']}
          onClick={handleDisableContentContainerClick}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
