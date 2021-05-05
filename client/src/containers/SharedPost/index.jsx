import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toggleExpandedPost } from 'src/containers/Thread/actions';
import { routeMatchType } from 'src/common/propTypes';

const SharedPost = ({ match }) => {
  const dispatch = useDispatch();
  const handleToggleExpandedPost = dispatch(toggleExpandedPost);

  useEffect(() => {
    handleToggleExpandedPost(match.params.postHash);
  });

  return <Redirect to="/" />;
};

SharedPost.propTypes = {
  match: routeMatchType.isRequired
};

export default SharedPost;
