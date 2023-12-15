import ReactDOM from 'react-dom';

import { useEffect, useMemo } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';
import { ReactNode } from 'react';

type PortalProps = {
  children: ReactNode;
};

const Portal: React.FC<PortalProps> = ({ children }) => {
  const portalContainer: HTMLDivElement = useMemo(() => {
    const element: HTMLDivElement = document.createElement('div');
    element.classList.add(styles.portal);

    return element;
  }, []);

  useEffect(() => {
    const wasOverflowHidden: boolean = document.body.classList.contains(
      styles.noOverflow
    );
    document.body.append(portalContainer);
    document.body.classList.add(styles.noOverflow);

    return () => {
      portalContainer.remove();
      if (!wasOverflowHidden) {
        document.body.classList.remove(styles.noOverflow);
      }
    };
  }, [portalContainer]);

  return ReactDOM.createPortal(children, portalContainer);
};

export { Portal };
