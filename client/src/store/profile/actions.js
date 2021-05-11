import { createAction } from '@reduxjs/toolkit';
import { StorageKey } from 'src/common/enums/enums';
import {
  storage as storageService,
  auth as authService
} from 'src/services/services';

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

  storageService.setItem(StorageKey.TOKEN, token);
  dispatch(setUser(user));
};

const register = request => async dispatch => {
  const { user, token } = await authService.registration(request);

  storageService.setItem(StorageKey.TOKEN, token);
  dispatch(setUser(user));
};

const logout = () => dispatch => {
  storageService.removeItem(StorageKey.TOKEN);
  dispatch(setUser(null));
};

const loadCurrentUser = () => async dispatch => {
  const user = await authService.getCurrentUser();

  dispatch(setUser(user));
};

export { setUser, login, register, logout, loadCurrentUser };
