import { useCallback } from 'hooks/hooks';

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
