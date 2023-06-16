import { createSlice,isAnyOf } from '@reduxjs/toolkit';

import { loadCurrentUser,login, logout, register } from './actions.js';

const initialState = {
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
