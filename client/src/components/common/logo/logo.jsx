import * as React from 'react';
import { Image } from 'src/components/common/common';

import styles from './styles.module.scss';

const Logo = () => (
  <h2 className={styles.logoWrapper}>
    <Image
      width="75"
      height="75"
      circular
      src="http://s1.iconbird.com/ico/2013/8/428/w256h2561377930292cattied.png"
    />
    Thread
  </h2>
);

export default Logo;
