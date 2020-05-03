import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { toggleExpandedPost } from 'src/containers/Thread/actions';

const SharedPost = ({ match, toggleExpandedPost: toggle }) => {
  useEffect(() => {
    toggle(match.params.postHash);
  });

  return <Redirect to="/" />;
};

SharedPost.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  toggleExpandedPost: PropTypes.func.isRequired
};

SharedPost.defaultProps = {
  match: undefined
};

const actions = { toggleExpandedPost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SharedPost);
