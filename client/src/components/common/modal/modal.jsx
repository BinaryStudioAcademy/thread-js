import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Portal } from 'components/common/common.js';
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
      <div className={clsx(styles.modal, isCentered && styles.centered)} onClick={handleOutsideClick}>
        <div className={styles.content} onClick={handleDisableContentContainerClick}>
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
