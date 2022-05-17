import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'hooks/hooks';

import styles from './styles.module.scss';

const Portal = ({ children }) => {
  const portalContainer = useMemo(() => {
    const el = document.createElement('div');
    el.classList.add(styles.portal);

    return el;
  }, []);

  useEffect(() => {
    const wasOverflowHidden = document.body.classList.contains(styles.noOverflow);
    document.body.appendChild(portalContainer);
    document.body.classList.add(styles.noOverflow);

    return () => {
      document.body.removeChild(portalContainer);
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
