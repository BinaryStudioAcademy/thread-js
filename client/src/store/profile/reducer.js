import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { login, logout, register, loadCurrentUser } from './actions.js';

const initialState = {
  user: null
};

const reducer = createReducer(initialState, builder => {
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
});

export { reducer };
