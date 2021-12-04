import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { threadActionCreator } from 'src/store/actions';
import { image as imageService } from 'src/services/services';
import { Post, Spinner, Checkbox } from 'src/components/common/common';
import { ExpandedPost, SharedPostLink, AddPost } from './components/components';

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
  const [sharedPostId, setSharedPostId] = React.useState(undefined);
  const [showOwnPosts, setShowOwnPosts] = React.useState(false);

  const handlePostLike = React.useCallback(id => (
    dispatch(threadActionCreator.likePost(id))
  ), [dispatch]);

  const handleExpandedPostToggle = React.useCallback(id => (
    dispatch(threadActionCreator.toggleExpandedPost(id))
  ), [dispatch]);

  const handlePostAdd = React.useCallback(postPayload => (
    dispatch(threadActionCreator.createPost(postPayload))
  ), [dispatch]);

  const handlePostsLoad = filtersPayload => {
    dispatch(threadActionCreator.loadPosts(filtersPayload));
  };

  const handleMorePostsLoad = React.useCallback(filtersPayload => {
    dispatch(threadActionCreator.loadMorePosts(filtersPayload));
  }, [dispatch]);

  const toggleShowOwnPosts = () => {
    setShowOwnPosts(!showOwnPosts);
    postsFilter.userId = showOwnPosts ? undefined : userId;
    postsFilter.from = 0;
    handlePostsLoad(postsFilter);
    postsFilter.from = postsFilter.count; // for the next scroll
  };

  const getMorePosts = React.useCallback(() => {
    handleMorePostsLoad(postsFilter);
    const { from, count } = postsFilter;
    postsFilter.from = from + count;
  }, [handleMorePostsLoad]);

  const sharePost = id => setSharedPostId(id);

  const uploadImage = file => imageService.uploadImage(file);

  React.useEffect(() => {
    getMorePosts();
  }, [getMorePosts]);

  return (
    <div className={styles.threadContent}>
      <div className={styles.addPostForm}>
        <AddPost onPostAdd={handlePostAdd} uploadImage={uploadImage} />
      </div>
      <div className={styles.toolbar}>
        <Checkbox
          toggle
          label="Show only my posts"
          checked={showOwnPosts}
          onChange={toggleShowOwnPosts}
        />
      </div>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePosts}
        hasMore={hasMorePosts}
        loader={<Spinner key="0" />}
        scrollableTarget="root"
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

export default Thread;
