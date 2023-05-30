import { AppRoute } from 'libs/enums/enums';
import { useDispatch, useEffect, useParams } from 'libs/hooks/hooks';
import { Navigate } from 'react-router-dom';
import { actions as threadActionCreator } from 'slices/thread/thread';

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
