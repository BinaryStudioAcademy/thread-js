import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useDispatch, useEffect, useParams } from '~/libs/hooks/hooks.js';
import { actions as threadActionCreator } from '~/slices/thread/thread.js';

const SharedPost = () => {
  const dispatch = useDispatch();
  const handleToggleExpandedPost = id => {
    dispatch(threadActionCreator.toggleExpandedPost(id));
  };
  const parameters = useParams();

  useEffect(() => {
    const { postHash = '' } = parameters;
    if (postHash) {
      handleToggleExpandedPost(postHash);
    }
  });

  return <Navigate to={AppRoute.ROOT} />;
};

export { SharedPost };
