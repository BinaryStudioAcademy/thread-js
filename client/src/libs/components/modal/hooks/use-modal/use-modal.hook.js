import { useCallback } from 'libs/hooks/hooks';

const useModal = ({ onClose }) => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDisableContentContainerClick = useCallback(ev => {
    ev.stopPropagation();
  }, []);

  return {
    handleOutsideClick,
    handleDisableContentContainerClick
  };
};

export { useModal };
