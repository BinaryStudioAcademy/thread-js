import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { IconName } from '~/libs/enums/enums.js';

import { Icon } from '../icon/icon.jsx';
import styles from './styles.module.scss';

const CopyBufferInput = forwardRef(({ onCopy, value }, reference) => (
  <div className={styles.copyContainer}>
    <input
      ref={reference}
      className={styles.copyInput}
      type="text"
      value={value}
      disabled
    />
    <button className={styles.copyBtn} type="button" onClick={onCopy}>
      Copy
      <span className={styles.icon}>
        <Icon name={IconName.COPY} />
      </span>
    </button>
  </div>
));

CopyBufferInput.displayName = 'CopyBufferInput';

CopyBufferInput.propTypes = {
  onCopy: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export { CopyBufferInput };
