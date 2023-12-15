import styles from './styles.module.scss';
import { ReactNode } from 'react';

type MessageProps = {
  children: ReactNode;
};

const Message: React.FC<MessageProps> = ({ children }) => (
  <div className={styles.message}>{children}</div>
);

export { Message };
