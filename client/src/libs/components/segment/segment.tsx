import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type SegmentProperties = {
  children: ReactNode;
};

const Segment: React.FC<SegmentProperties> = ({ children }) => (
  <div className={styles['segment']}>{children}</div>
);

export { Segment };
