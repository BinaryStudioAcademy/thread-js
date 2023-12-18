import styles from './styles.module.scss';

type SpinnerProperties = {
  isOverflow?: boolean;
};

const Spinner: React.FC<SpinnerProperties> = ({ isOverflow }) =>
  isOverflow ? (
    <div className={styles['container']}>
      <div className={styles['loader']}>Loading...</div>
    </div>
  ) : (
    <div className={styles['loader']}>Loading...</div>
  );

export { Spinner };
