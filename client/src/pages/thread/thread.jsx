import {
  useState,
  useCallback,
  useEffect,
  useAppForm,
  useDispatch,
  useSelector
} from 'libs/hooks/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { actions as threadActionCreator } from 'slices/thread/thread';
import { image as imageService } from 'packages/image/image';
import { ThreadToolbarKey, UseFormMode, PostsFilterAction } from 'libs/enums/enums';
import { Post } from 'libs/components/post/post';
import { Spinner } from 'libs/components/spinner/spinner';
import { Checkbox } from 'libs/components/checkbox/checkbox';
import { useReducer } from 'react';
import { ExpandedPost, SharedPostLink, AddPost } from './components/components';
import { DEFAULT_THREAD_TOOLBAR } from './libs/common/constants';

import styles from './styles.module.scss';

const postsFilterInitialState = {
  userId: undefined,
  from: 0,
  count: 10
};

const postsFilterReducer = (state, action) => {
  switch (action.type) {
    case PostsFilterAction.TOGGLE_SHOW_OWN_POSTS: {
      const { userId, from } = action.payload;
      return {
        ...state,
        userId,
        from
      };
    }
    case PostsFilterAction.UPDATE_FROM: {
      return {
        ...state,
        from: action.payload.from
      };
    }
    default:
      return state;
  }
};

const Thread = () => {
  const dispatch = useDispatch();
  const { posts, hasMorePosts, expandedPost, userId } = useSelector(state => ({
    posts: state.posts.posts,
    hasMorePosts: state.posts.hasMorePosts,
    expandedPost: state.posts.expandedPost,
    userId: state.profile.user.id
  }));

  const [postsFilter, dispatchPostsFilter] = useReducer(postsFilterReducer, postsFilterInitialState);

  const [sharedPostId, setSharedPostId] = useState(undefined);

  const { control, watch } = useAppForm({
    defaultValues: DEFAULT_THREAD_TOOLBAR,
    mode: UseFormMode.ON_CHANGE
  });

  const showOwnPosts = watch(ThreadToolbarKey.SHOW_OWN_POSTS);

  const handlePostsLoad = useCallback(
    filtersPayload => {
      dispatch(threadActionCreator.loadPosts(filtersPayload));
    },
    [dispatch]
  );

  const handleToggleShowOwnPosts = useCallback(() => {
    const currentUserId = showOwnPosts ? userId : undefined;

    handlePostsLoad({ ...postsFilterInitialState, userId: currentUserId });

    dispatchPostsFilter({
      type: PostsFilterAction.TOGGLE_SHOW_OWN_POSTS,
      payload: {
        userId: currentUserId,
        from: postsFilter.count
      }
    });
  }, [showOwnPosts, userId, handlePostsLoad]);

  useEffect(() => {
    handleToggleShowOwnPosts();
  }, [showOwnPosts, handleToggleShowOwnPosts]);

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

  const handleGetMorePosts = useCallback(() => {
    handleMorePostsLoad(postsFilter);

    const { from, count } = postsFilter;

    dispatchPostsFilter({
      type: PostsFilterAction.UPDATE_FROM,
      payload: {
        from: count + from
      }
    });
  }, [handleMorePostsLoad, postsFilter]);

  const handleSharePost = id => setSharedPostId(id);

  const handleUploadImage = file => imageService.uploadImage(file);

  const handleCloseSharedPostLink = () => setSharedPostId(undefined);

  return (
    <div className={styles.threadContent}>
      <div className={styles.addPostForm}>
        <AddPost onPostAdd={handlePostAdd} onUploadImage={handleUploadImage} />
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
      <div className={styles.posts}>
        <InfiniteScroll
          dataLength={posts.length}
          next={handleGetMorePosts}
          scrollThreshold={0.8}
          hasMore={hasMorePosts}
          loader={<Spinner key="0" />}
        >
          {posts.map(post => (
            <Post
              post={post}
              onPostLike={handlePostLike}
              onExpandedPostToggle={handleExpandedPostToggle}
              onSharePost={handleSharePost}
              key={post.id}
            />
          ))}
        </InfiniteScroll>
      </div>
      {expandedPost && <ExpandedPost onSharePost={handleSharePost} />}
      {sharedPostId && (
        <SharedPostLink
          postId={sharedPostId}
          onClose={handleCloseSharedPostLink}
        />
      )}
    </div>
  );
};

export { Thread };
