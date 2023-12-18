import clsx from 'clsx';

import { type ImageSize } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type ImageProperties = {
  alt: string;
  isCentered?: boolean;
  isCircular?: boolean;
  className?: string;
  height?: string;
  size?: ValueOf<typeof ImageSize>;
  width?: string;
  src: string;
};

const Image: React.FC<ImageProperties> = ({
  alt,
  isCentered,
  isCircular,
  className,
  height,
  size,
  src,
  width
}) => (
  <img
    className={clsx(
      styles['image'],
      isCircular && styles['circular'],
      isCentered && styles['centered'],
      size && styles[`imageSize__${size}`],
      className
    )}
    width={width}
    height={height}
    src={src}
    alt={alt}
  />
);

export { Image };
