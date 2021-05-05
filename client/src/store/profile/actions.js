import { createAction } from '@reduxjs/toolkit';
import * as authService from 'src/services/authService';

const ActionType = {
  SET_USER: 'profile/set-user'
};

const setToken = token => localStorage.setItem('token', token);

const setUser = createAction(ActionType.SET_USER, user => ({
  payload: {
    user
  }
}));

const login = request => async dispatch => {
  const { user, token } = await authService.login(request);

  setToken(token);
  dispatch(setUser(user));
};

const register = request => async dispatch => {
  const { user, token } = await authService.login(request);

  setToken(token);
  dispatch(setUser(user));
};

const logout = () => dispatch => {
  setToken('');
  dispatch(setUser(null));
};

const loadCurrentUser = () => async dispatch => {
  const user = await authService.getCurrentUser();

  dispatch(setUser(user));
};

export { setUser, login, register, logout, loadCurrentUser };
