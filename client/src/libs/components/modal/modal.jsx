/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Portal } from '../portal/portal.jsx';
import { useModal } from './hooks/hooks.js';
import styles from './styles.module.scss';

const Modal = ({ isOpen, isCentered, onClose, children }) => {
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
        tabIndex="0"
      >
        <div
          className={styles.content}
          onClick={handleDisableContentContainerClick}
          role="button"
          tabIndex="0"
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  isCentered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  isCentered: false
};

export { Modal };
