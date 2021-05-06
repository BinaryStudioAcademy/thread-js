import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { threadActionCreator } from 'src/store/actions';
import { AppRoute } from 'src/common/enums/enums';
import { routeMatchType } from 'src/common/prop-types/prop-types';

const SharedPost = ({ match }) => {
  const dispatch = useDispatch();
  const handleToggleExpandedPost = id => {
    dispatch(threadActionCreator.toggleExpandedPost(id));
  };

  React.useEffect(() => {
    handleToggleExpandedPost(match.params.postHash);
  });

  return <Redirect to={AppRoute.ROOT} />;
};

SharedPost.propTypes = {
  match: routeMatchType.isRequired
};

export default SharedPost;
