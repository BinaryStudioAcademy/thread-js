import { isAnyOf, createSlice } from '@reduxjs/toolkit';
import { login, logout, register, loadCurrentUser } from './actions';

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

export { reducer, actions, name };
