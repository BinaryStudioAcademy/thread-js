import { createAction } from '@reduxjs/toolkit';
import { HttpError } from 'src/exceptions/exceptions';
import { HttpCode, StorageKey } from 'src/common/enums/enums';
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
  try {
    const user = await authService.getCurrentUser();

    dispatch(setUser(user));
  } catch (err) {
    const isHttpError = err instanceof HttpError;

    if (isHttpError && err.status === HttpCode.UNAUTHORIZED) {
      dispatch(logout());
    }
  }
};

export { setUser, login, register, logout, loadCurrentUser };
