import { createReducer } from '@reduxjs/toolkit';
import { setUser } from './actions';

const initialState = {
  user: null,
  isLoading: true,
  isAuthorized: false
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setUser, (state, action) => {
    const { user } = action.payload;

    state.user = user;
    state.isAuthorized = Boolean(user?.id);
    state.isLoading = false;
  });
});

export { reducer };
