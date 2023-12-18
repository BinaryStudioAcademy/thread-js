import { useCallback } from '~/libs/hooks/hooks.js';

type UseModalProperties = {
  onClose: () => void;
};

const useModal = ({
  onClose
}: UseModalProperties): {
  handleOutsideClick: () => void;
  handleDisableContentContainerClick: (event: React.SyntheticEvent) => void;
} => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDisableContentContainerClick = useCallback(
    (event_: React.SyntheticEvent) => {
      event_.stopPropagation();
    },
    []
  );

  return {
    handleOutsideClick,
    handleDisableContentContainerClick
  };
};

export { useModal };
