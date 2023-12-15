import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { useEffect, useMemo } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Portal = ({ children }) => {
  const portalContainer = useMemo(() => {
    const element = document.createElement('div');
    element.classList.add(styles.portal);

    return element;
  }, []);

  useEffect(() => {
    const wasOverflowHidden = document.body.classList.contains(
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

Portal.propTypes = {
  children: PropTypes.element.isRequired
};

export { Portal };
