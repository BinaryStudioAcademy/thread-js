import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { IconName } from 'common/enums/enums.js';
import { Icon } from 'components/common/common.js';

import styles from './styles.module.scss';

const CopyBufferInput = forwardRef(({ onCopy, value }, ref) => (
  <div className={styles.copyContainer}>
    <input ref={ref} className={styles.copyInput} type="text" value={value} disabled />
    <button className={styles.copyBtn} type="button" onClick={onCopy}>
      Copy
      <span className={styles.icon}><Icon name={IconName.COPY} /></span>
    </button>
  </div>
));

CopyBufferInput.propTypes = {
  onCopy: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export { CopyBufferInput };
