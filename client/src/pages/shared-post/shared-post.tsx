import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppDispatch, useEffect, useParams } from '~/libs/hooks/hooks.js';
import { actions as threadActionCreator } from '~/slices/thread/thread.js';

const SharedPost: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleToggleExpandedPost = (id: string): void => {
    void dispatch(threadActionCreator.toggleExpandedPost(Number(id)));
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
