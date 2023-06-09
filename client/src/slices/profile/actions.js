import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExceptionMessage,StorageKey } from 'libs/enums/enums';
import { HttpCode } from 'packages/http/libs/enums/enums';
import { HttpError } from 'packages/http/libs/exceptions/exceptions';

import { ActionType } from './common';

const login = createAsyncThunk(
  ActionType.LOG_IN,
  async (request, { extra: { services } }) => {
    const { user, token } = await services.auth.login(request);

    services.storage.setItem(StorageKey.TOKEN, token);

    return user;
  }
);

const register = createAsyncThunk(
  ActionType.REGISTER,
  async (request, { extra: { services } }) => {
    const { user, token } = await services.auth.registration(request);

    services.storage.setItem(StorageKey.TOKEN, token);

    return user;
  }
);

const logout = createAsyncThunk(
  ActionType.LOG_OUT,
  (_request, { extra: { services } }) => {
    services.storage.removeItem(StorageKey.TOKEN);

    return null;
  }
);

const loadCurrentUser = createAsyncThunk(
  ActionType.LOG_IN,
  async (_request, { dispatch, rejectWithValue, extra: { services } }) => {
    try {
      return await services.auth.getCurrentUser();
    } catch (error) {
      const isHttpError = error instanceof HttpError;

      if (isHttpError && error.status === HttpCode.UNAUTHORIZED) {
        dispatch(logout());
      }

      return rejectWithValue(error?.message ?? ExceptionMessage.UNKNOWN_ERROR);
    }
  }
);

export { loadCurrentUser,login, logout, register };
