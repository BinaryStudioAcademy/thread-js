import InfiniteScroll, {
  type Props as InfiniteScrollProperties
} from 'react-infinite-scroll-component';

import { Checkbox } from '~/libs/components/checkbox/checkbox.js';
import { Post } from '~/libs/components/post/post.js';
import { Spinner } from '~/libs/components/spinner/spinner.js';
import { ThreadToolbarKey } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useState
} from '~/libs/hooks/hooks.js';
import { imageApi } from '~/packages/image/image.js';
import {
  type CreatePostRequestDto,
  type GetPostsByFilterRequestDto
} from '~/packages/post/post.js';
import { type UserWithImageRelation } from '~/packages/user/user.js';
import { actions as threadActionCreator } from '~/slices/thread/thread.js';

import {
  AddPost,
  ExpandedPost,
  SharedPostLink
} from './components/components.js';
import { DEFAULT_THREAD_TOOLBAR } from './libs/common/constants.js';
import { usePostsFilter } from './libs/hooks/use-posts-filter/use-posts-filter.js';
import styles from './styles.module.scss';

// FIXME: JSX element type 'InfiniteScroll' does not have any construct or call signatures.
const InfiniteScrollComponent =
  InfiniteScroll as unknown as React.ComponentType<InfiniteScrollProperties>;

const Thread: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, hasMorePosts, expandedPost, userId } = useAppSelector(
    state => ({
      posts: state.posts.posts,
      hasMorePosts: state.posts.hasMorePosts,
      expandedPost: state.posts.expandedPost,
      userId: (state.profile.user as UserWithImageRelation).id
    })
  );

  const { postsFilter, handleShownOwnPosts } = usePostsFilter();

  const [sharedPostId, setSharedPostId] = useState<number | null>(null);

  const { control, watch } = useAppForm({
    defaultValues: DEFAULT_THREAD_TOOLBAR,
    mode: 'onChange'
  });

  const showOwnPosts = watch(ThreadToolbarKey.SHOW_OWN_POSTS);

  const handlePostsLoad = useCallback(
    (filtersPayload: GetPostsByFilterRequestDto): void => {
      void dispatch(threadActionCreator.loadPosts(filtersPayload));
    },
    [dispatch]
  );

  const handleToggleShowOwnPosts = useCallback(() => {
    const currentUserId = showOwnPosts ? userId : null;

    handleShownOwnPosts(currentUserId);
  }, [handleShownOwnPosts, showOwnPosts, userId]);

  useEffect(() => {
    handleToggleShowOwnPosts();
  }, [showOwnPosts, handleToggleShowOwnPosts]);

  useEffect(() => {
    handlePostsLoad(postsFilter as GetPostsByFilterRequestDto);
  }, [handlePostsLoad, postsFilter]);

  const handlePostLike = useCallback(
    (id: number) => dispatch(threadActionCreator.likePost(id)),
    [dispatch]
  );

  const handleExpandedPostToggle = useCallback(
    (id: number) => dispatch(threadActionCreator.toggleExpandedPost(id)),
    [dispatch]
  );

  const handlePostAdd = useCallback(
    (postPayload: CreatePostRequestDto) =>
      dispatch(threadActionCreator.createPost(postPayload)),
    [dispatch]
  );

  const handleUploadImage = useCallback(
    (file: File) => imageApi.uploadImage(file),
    []
  );

  const handleMorePostsLoad = useCallback(
    (filtersPayload: GetPostsByFilterRequestDto) => {
      void dispatch(threadActionCreator.loadMorePosts(filtersPayload));
    },
    [dispatch]
  );

  const handleGetMorePosts = useCallback(() => {
    handleMorePostsLoad(postsFilter as GetPostsByFilterRequestDto);
  }, [handleMorePostsLoad, postsFilter]);

  const handleSharePost = useCallback((id: number) => {
    setSharedPostId(id);
  }, []);

  const handleCloseSharedPostLink = useCallback(() => {
    setSharedPostId(null);
  }, []);

  return (
    <div className={styles['threadContent']}>
      <div className={styles['addPostForm']}>
        <AddPost onPostAdd={handlePostAdd} onUploadImage={handleUploadImage} />
      </div>
      <form name="thread-toolbar">
        <div className={styles['toolbar']}>
          <Checkbox
            name={ThreadToolbarKey.SHOW_OWN_POSTS}
            control={control}
            label="Show only my posts"
          />
        </div>
      </form>
      <div className={styles['posts']}>
        <InfiniteScrollComponent
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
        </InfiniteScrollComponent>
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
