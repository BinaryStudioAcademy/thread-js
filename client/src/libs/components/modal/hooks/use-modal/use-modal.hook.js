import { useCallback } from 'libs/hooks/hooks';

const useModal = ({ onClose }) => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDisableContentContainerClick = useCallback(event_ => {
    event_.stopPropagation();
  }, []);

  return {
    handleOutsideClick,
    handleDisableContentContainerClick
  };
};

export { useModal };
