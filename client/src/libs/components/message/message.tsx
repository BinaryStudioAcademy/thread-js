import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type MessageProperties = {
  children: ReactNode;
};

const Message: React.FC<MessageProperties> = ({ children }) => (
  <div className={styles['message']}>{children}</div>
);

export { Message };
