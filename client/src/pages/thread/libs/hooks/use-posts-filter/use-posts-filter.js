import { createReducer } from '@reduxjs/toolkit';
import { PostsFilterAction } from 'libs/enums/enums';
import { useCallback, useReducer } from 'react';

const postsFilterInitialState = {
  userId: undefined
};

const postsFilterReducer = createReducer(postsFilterInitialState, builder => {
  builder.addCase(PostsFilterAction.TOGGLE_SHOW_OWN_POSTS, (state, action) => {
    state.userId = action.payload.userId;
  });
});

const usePostsFilter = () => {
  const [postsFilter, dispatchPostsFilter] = useReducer(
    postsFilterReducer,
    postsFilterInitialState
  );

  const handleShownOwnPosts = useCallback(userId => {
    dispatchPostsFilter({
      type: PostsFilterAction.TOGGLE_SHOW_OWN_POSTS,
      payload: {
        userId
      }
    });
  }, []);

  return { postsFilter, handleShownOwnPosts };
};

export { usePostsFilter };
