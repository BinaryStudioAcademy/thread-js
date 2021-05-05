import * as authService from 'src/services/authService';
import { SET_USER } from './actionTypes';

const setToken = token => localStorage.setItem('token', token);

const setUser = user => ({
  type: SET_USER,
  user
});

export const login = request => async dispatch => {
  const { user, token } = await authService.login(request);

  setToken(token);
  dispatch(setUser(user));
};

export const register = request => async dispatch => {
  const { user, token } = await authService.login(request);

  setToken(token);
  dispatch(setUser(user));
};

export const logout = () => dispatch => {
  setToken('');
  dispatch(setUser(null));
};

export const loadCurrentUser = () => async dispatch => {
  const user = await authService.getCurrentUser();

  dispatch(setUser(user));
};
