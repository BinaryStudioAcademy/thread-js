import { createReducer } from '@reduxjs/toolkit';
import { setUser } from './actions';

const initialState = {
  user: null
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(setUser, (state, action) => {
    const { user } = action.payload;

    state.user = user;
  });
});

export { reducer };
