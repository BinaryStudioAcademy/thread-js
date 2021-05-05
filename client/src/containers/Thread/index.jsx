import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Checkbox, Loader } from 'semantic-ui-react';
import * as imageService from 'src/services/imageService';
import ExpandedPost from 'src/containers/ExpandedPost';
import Post from 'src/components/Post';
import AddPost from 'src/components/AddPost';
import SharedPostLink from 'src/components/SharedPostLink';
import {
  loadPosts,
  loadMorePosts,
  likePost,
  toggleExpandedPost,
  addPost
} from './actions';

import styles from './styles.module.scss';

const postsFilter = {
  userId: undefined,
  from: 0,
  count: 10
};

const Thread = () => {
  const { posts, hasMorePosts, expandedPost, userId } = useSelector(state => ({
    posts: state.posts.posts,
    hasMorePosts: state.posts.hasMorePosts,
    expandedPost: state.posts.expandedPost,
    userId: state.profile.user.id
  }));
  const [sharedPostId, setSharedPostId] = useState(undefined);
  const [showOwnPosts, setShowOwnPosts] = useState(false);
  const dispatch = useDispatch();

  const handlePostLike = useCallback(id => {
    dispatch(likePost(id));
  },
  [dispatch]);

  const handleExpandedPostToggle = useCallback(id => {
    dispatch(toggleExpandedPost(id));
  },
  [dispatch]);

  const handlePostAdd = useCallback(postPayload => {
    dispatch(addPost(postPayload));
  }, [dispatch]);

  const handlePostsLoad = filtersPayload => dispatch(loadPosts(filtersPayload));

  const handleMorePostsLoad = filtersPayload => dispatch(loadMorePosts(filtersPayload));

  const toggleShowOwnPosts = () => {
    setShowOwnPosts(!showOwnPosts);
    postsFilter.userId = showOwnPosts ? undefined : userId;
    postsFilter.from = 0;
    handlePostsLoad(postsFilter);
    postsFilter.from = postsFilter.count; // for the next scroll
  };

  const getMorePosts = () => {
    handleMorePostsLoad(postsFilter);
    const { from, count } = postsFilter;
    postsFilter.from = from + count;
  };

  const sharePost = id => setSharedPostId(id);

  const uploadImage = file => imageService.uploadImage(file);

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
        pageStart={0}
        loadMore={getMorePosts}
        hasMore={hasMorePosts}
        loader={<Loader active inline="centered" key={0} />}
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
