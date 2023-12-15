import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import { ReactNode } from 'react';

type SegmentProps = {
  children: ReactNode;
};

const Segment: React.FC<SegmentProps> = ({ children }) => (
  <div className={styles.segment}>{children}</div>
);

export { Segment };
