import { forwardRef } from 'react';

import { IconName } from '~/libs/enums/enums.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';

type CopyBufferInputProperties = {
  onCopy: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
};

const CopyBufferInput: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  CopyBufferInputProperties
> = ({ onCopy, value }, reference) => (
  <div className={styles['copyContainer']}>
    <input
      ref={reference}
      className={styles['copyInput']}
      type="text"
      value={value}
      disabled
    />
    <button className={styles['copyBtn']} type="button" onClick={onCopy}>
      Copy
      <span className={styles['icon']}>
        <Icon name={IconName.COPY} />
      </span>
    </button>
  </div>
);

CopyBufferInput.displayName = 'CopyBufferInput';

const ForwardedCopyBufferInput = forwardRef(CopyBufferInput);

export { ForwardedCopyBufferInput as CopyBufferInput };
