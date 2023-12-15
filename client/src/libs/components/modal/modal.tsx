/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';

import { Portal } from '../portal/portal.jsx';
import { useModal } from './hooks/hooks.js';
import styles from './styles.module.scss';
import { ReactNode } from 'react';

type ModalProps = {
  isCentered?: boolean;
  children: ReactNode;
  isOpen: boolean;
  onClose: Function;
};

const Modal: React.FC<ModalProps> = ({ isOpen, isCentered, onClose, children }) => {
  const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
    onClose
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={clsx(styles.modal, isCentered && styles.centered)}
        onClick={handleOutsideClick}
        role="button"
        tabIndex={0}
      >
        <div
          className={styles.content}
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
