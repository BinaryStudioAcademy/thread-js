import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Spinner = ({ isOverflow }) => (isOverflow ? (
  <Dimmer active inverted>
    <Loader active inline="centered" />
  </Dimmer>
) : (
  <Loader active inline="centered" />
));

Spinner.propTypes = {
  isOverflow: PropTypes.bool
};

Spinner.defaultProps = {
  isOverflow: false
};

export default Spinner;
