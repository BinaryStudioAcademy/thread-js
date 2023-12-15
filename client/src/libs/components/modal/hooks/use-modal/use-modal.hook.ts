import { useCallback } from '~/libs/hooks/hooks.js';

type UseModalProps = {
  onClose: Function;
};

const useModal = ({ onClose }: UseModalProps) => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDisableContentContainerClick = useCallback((event_ : React.SyntheticEvent) => {
    event_.stopPropagation();
  }, []);

  return {
    handleOutsideClick,
    handleDisableContentContainerClick
  };
};

export { useModal };
