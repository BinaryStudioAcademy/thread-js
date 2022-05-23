import { useEffect, useDispatch, useParams } from 'hooks/hooks';
import { Navigate } from 'react-router-dom';
import { threadActionCreator } from 'store/actions';
import { AppRoute } from 'common/enums/enums';

const SharedPost = () => {
  const dispatch = useDispatch();
  const handleToggleExpandedPost = id => {
    dispatch(threadActionCreator.toggleExpandedPost(id));
  };
  const params = useParams();

  useEffect(() => {
    const { postHash = '' } = params;
    if (postHash) {
      handleToggleExpandedPost(postHash);
    }
  });

  return <Navigate to={AppRoute.ROOT} />;
};

export { SharedPost };
