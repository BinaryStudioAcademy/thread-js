import clsx from 'clsx';
import PropTypes from 'prop-types';
import Portal from '../portal/portal';
import { useModal } from './hooks/hooks';
import styles from './styles.module.scss';

const Modal = ({ isOpen, isCentered, onClose, children }) => {
  const { disableContentContainerClick, onOutsideClick } = useModal({
    onClose
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={clsx(styles.modal, isCentered && styles.centered)} onClick={onOutsideClick}>
        <div className={styles.content} onClick={disableContentContainerClick}>
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

export default Modal;
