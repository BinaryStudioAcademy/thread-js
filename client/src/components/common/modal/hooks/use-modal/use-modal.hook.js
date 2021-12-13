import { useCallback } from 'hooks/hooks';

const useModal = ({ onClose }) => {
  const onOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const disableContentContainerClick = useCallback(ev => {
    ev.stopPropagation();
  }, []);

  return {
    onOutsideClick,
    disableContentContainerClick
  };
};

export { useModal };
