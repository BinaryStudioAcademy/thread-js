import clsx from 'clsx';
import PropTypes from 'prop-types';

import { ImageSize } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

const Image = ({
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
      styles.image,
      isCircular && styles.circular,
      isCentered && styles.centered,
      size && styles[`imageSize__${size}`],
      className
    )}
    width={width}
    height={height}
    src={src}
    alt={alt}
  />
);

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  isCentered: PropTypes.bool,
  isCircular: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.oneOf(Object.values(ImageSize)),
  src: PropTypes.string.isRequired,
  width: PropTypes.string
};

Image.defaultProps = {
  isCentered: false,
  isCircular: false,
  className: undefined,
  height: undefined,
  size: undefined,
  width: undefined
};

export { Image };
