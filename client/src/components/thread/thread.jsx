import {
  useState,
  useCallback,
  useEffect,
  useAppForm,
  useDispatch,
  useSelector
} from 'hooks/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { threadActionCreator } from 'store/actions';
import { image as imageService } from 'services/services';
import { ThreadToolbarKey, UseFormMode } from 'common/enums/enums';
import { Post, Spinner, Checkbox } from 'components/common/common';
import { ExpandedPost, SharedPostLink, AddPost } from './components/components';
import { DEFAULT_THREAD_TOOLBAR } from './common/constants';

import styles from './styles.module.scss';

const postsFilter = {
  userId: undefined,
  from: 0,
  count: 10
};

const Thread = () => {
  const dispatch = useDispatch();
  const { posts, hasMorePosts, expandedPost, userId } = useSelector(state => ({
    posts: state.posts.posts,
    hasMorePosts: state.posts.hasMorePosts,
    expandedPost: state.posts.expandedPost,
    userId: state.profile.user.id
  }));
  const [sharedPostId, setSharedPostId] = useState(undefined);

  const { control, watch } = useAppForm({
    defaultValues: DEFAULT_THREAD_TOOLBAR,
    mode: UseFormMode.ON_CHANGE
  });

  const showOwnPosts = watch(ThreadToolbarKey.SHOW_OWN_POSTS);

  const handlePostsLoad = useCallback(filtersPayload => {
    dispatch(threadActionCreator.loadPosts(filtersPayload));
  }, [dispatch]);

  const toggleShowOwnPosts = useCallback(
    () => {
      postsFilter.userId = showOwnPosts ? userId : undefined;
      postsFilter.from = 0;
      handlePostsLoad(postsFilter);
      postsFilter.from = postsFilter.count; // for the next scroll
    },
    [userId, showOwnPosts, handlePostsLoad]
  );

  useEffect(() => {
    toggleShowOwnPosts();
  }, [showOwnPosts, toggleShowOwnPosts]);

  const handlePostLike = useCallback(
    id => dispatch(threadActionCreator.likePost(id)),
    [dispatch]
  );

  const handleExpandedPostToggle = useCallback(
    id => dispatch(threadActionCreator.toggleExpandedPost(id)),
    [dispatch]
  );

  const handlePostAdd = useCallback(
    postPayload => dispatch(threadActionCreator.createPost(postPayload)),
    [dispatch]
  );

  const handleMorePostsLoad = useCallback(
    filtersPayload => {
      dispatch(threadActionCreator.loadMorePosts(filtersPayload));
    },
    [dispatch]
  );

  const getMorePosts = useCallback(() => {
    handleMorePostsLoad(postsFilter);
    const { from, count } = postsFilter;
    postsFilter.from = from + count;
  }, [handleMorePostsLoad]);

  const sharePost = id => setSharedPostId(id);

  const uploadImage = file => imageService.uploadImage(file);

  useEffect(() => {
    getMorePosts();
  }, [getMorePosts]);

  return (
    <div className={styles.threadContent}>
      <div className={styles.addPostForm}>
        <AddPost onPostAdd={handlePostAdd} uploadImage={uploadImage} />
      </div>
      <form name="thread-toolbar">
        <div className={styles.toolbar}>
          <Checkbox
            name={ThreadToolbarKey.SHOW_OWN_POSTS}
            control={control}
            label="Show only my posts"
          />
        </div>
      </form>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePosts}
        scrollThreshold={0.8}
        hasMore={hasMorePosts}
        loader={<Spinner key="0" />}
      >
        {posts.map(post => (
          <Post
            post={post}
            onPostLike={handlePostLike}
            onExpandedPostToggle={handleExpandedPostToggle}
            sharePost={sharePost}
            key={post.id}
          />
        ))}
      </InfiniteScroll>
      {expandedPost && <ExpandedPost sharePost={sharePost} />}
      {sharedPostId && (
        <SharedPostLink
          postId={sharedPostId}
          close={() => setSharedPostId(undefined)}
        />
      )}
    </div>
  );
};

export { Thread };
