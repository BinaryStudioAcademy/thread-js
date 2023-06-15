import { useCallback } from '~/libs/hooks/hooks.js';

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
