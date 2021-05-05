import { createAction } from '@reduxjs/toolkit';
import { StorageKey } from 'src/common/enums/enums';
import * as authService from 'src/services/authService';
import { storage } from 'src/services/services';

const ActionType = {
  SET_USER: 'profile/set-user'
};

const setUser = createAction(ActionType.SET_USER, user => ({
  payload: {
    user
  }
}));

const login = request => async dispatch => {
  const { user, token } = await authService.login(request);

  storage.setItem(StorageKey.TOKEN, token);
  dispatch(setUser(user));
};

const register = request => async dispatch => {
  const { user, token } = await authService.registration(request);

  storage.setItem(StorageKey.TOKEN, token);
  dispatch(setUser(user));
};

const logout = () => dispatch => {
  storage.removeItem(StorageKey.TOKEN);
  dispatch(setUser(null));
};

const loadCurrentUser = () => async dispatch => {
  const user = await authService.getCurrentUser();

  dispatch(setUser(user));
};

export { setUser, login, register, logout, loadCurrentUser };
