import { type ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { useEffect, useMemo } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type PortalProperties = {
  children: ReactNode;
};

const Portal: React.FC<PortalProperties> = ({ children }) => {
  const portalContainer: HTMLDivElement = useMemo(() => {
    const element: HTMLDivElement = document.createElement('div');
    element.classList.add(styles['portal'] as string);

    return element;
  }, []);

  useEffect(() => {
    const wasOverflowHidden: boolean = document.body.classList.contains(
      styles['noOverflow'] as string
    );
    document.body.append(portalContainer);
    document.body.classList.add(styles['noOverflow'] as string);

    return () => {
      portalContainer.remove();

      if (!wasOverflowHidden) {
        document.body.classList.remove(styles['noOverflow'] as string);
      }
    };
  }, [portalContainer]);

  return ReactDOM.createPortal(children, portalContainer);
};

export { Portal };
