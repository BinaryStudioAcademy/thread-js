import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { type UserAuthResponse } from '~/packages/auth/auth.js';

import { loadCurrentUser, login, logout, register } from './actions.js';

type State = {
  user: UserAuthResponse | null;
};

const initialState: State = {
  user: null
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'profile',
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(
          login.fulfilled,
          logout.fulfilled,
          register.fulfilled,
          loadCurrentUser.fulfilled
        ),
        (state, action) => {
          state.user = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          login.rejected,
          logout.rejected,
          register.rejected,
          loadCurrentUser.rejected
        ),
        state => {
          state.user = null;
        }
      );
  }
});

export { actions, name, reducer };
