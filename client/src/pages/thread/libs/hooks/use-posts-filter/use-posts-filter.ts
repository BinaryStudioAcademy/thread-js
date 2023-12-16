import { createAction, createReducer } from '@reduxjs/toolkit';
import { useCallback, useReducer } from 'react';

import { PostsFilterAction } from '~/libs/enums/enums.js';

type State = {
  userId: number | null;
};

const FilterAction = {
  TOGGLE_SHOW_OWN_POSTS: createAction<Record<'userId', number | null>>(
    PostsFilterAction.TOGGLE_SHOW_OWN_POSTS
  )
} as const;

const postsFilterInitialState: State = {
  userId: null
};

const postsFilterReducer = createReducer(postsFilterInitialState, builder => {
  builder.addCase(FilterAction.TOGGLE_SHOW_OWN_POSTS, (state, action) => {
    state.userId = action.payload.userId;
  });
});

const usePostsFilter = (): {
  postsFilter: State;
  handleShownOwnPosts: (userId: number | null) => void;
} => {
  const [postsFilter, dispatchPostsFilter] = useReducer(
    postsFilterReducer,
    postsFilterInitialState
  );

  const handleShownOwnPosts = useCallback((userId: number | null) => {
    dispatchPostsFilter(FilterAction.TOGGLE_SHOW_OWN_POSTS({ userId }));
  }, []);

  return { postsFilter, handleShownOwnPosts };
};

export { usePostsFilter };
