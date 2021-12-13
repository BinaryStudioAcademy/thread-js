import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ImageSize } from 'common/enums/enums';

import styles from './styles.module.scss';

const Image = ({
  alt,
  centered,
  circular,
  className,
  height,
  size,
  src,
  width
}) => (
  <img
    className={clsx(
      styles.image,
      circular && styles.circular,
      centered && styles.centered,
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
  centered: PropTypes.bool,
  circular: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.oneOf(Object.values(ImageSize)),
  src: PropTypes.string.isRequired,
  width: PropTypes.string
};

Image.defaultProps = {
  centered: undefined,
  circular: false,
  className: undefined,
  height: undefined,
  size: undefined,
  width: undefined
};

export default Image;
