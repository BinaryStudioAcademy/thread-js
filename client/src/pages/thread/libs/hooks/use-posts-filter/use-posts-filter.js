import { createReducer } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import { PostsFilterAction } from '../../../../../libs/enums/thread/post-filter-action.enum';

const postsFilterInitialState = {
  userId: undefined
};

const postsFilterReducer = createReducer(postsFilterInitialState, builder => {
  builder
    .addCase(PostsFilterAction.TOGGLE_SHOW_OWN_POSTS, (state, action) => {
      const { userId } = action.payload;
      state.userId = userId;
    });
});

const usePostsFilter = () => {
  const [postsFilter, dispatchPostsFilter] = useReducer(postsFilterReducer, postsFilterInitialState);

  return { postsFilter, dispatchPostsFilter };
};

export { usePostsFilter };
