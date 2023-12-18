import { createAsyncThunk } from '@reduxjs/toolkit';

import { ExceptionMessage, StorageKey } from '~/libs/enums/enums.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponse,
  type UserLoginRequestDto,
  type UserLoginResponseDto,
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from '~/packages/auth/auth.js';
import { HttpCode } from '~/packages/http/libs/enums/enums.js';
import { HttpError } from '~/packages/http/libs/exceptions/exceptions.js';

import { ActionType } from './common.js';

const login = createAsyncThunk<
  UserLoginResponseDto['user'],
  UserLoginRequestDto,
  AsyncThunkConfig
>(ActionType.LOG_IN, async (request, { extra: { authApi, storageApi } }) => {
  const { user, token } = await authApi.login(request);

  storageApi.set(StorageKey.TOKEN, token);

  return user;
});

const register = createAsyncThunk<
  UserRegisterResponseDto['user'],
  UserRegisterRequestDto,
  AsyncThunkConfig
>(ActionType.REGISTER, async (request, { extra: { authApi, storageApi } }) => {
  const { user, token } = await authApi.registration(request);

  storageApi.set(StorageKey.TOKEN, token);

  return user;
});

const logout = createAsyncThunk<null, undefined, AsyncThunkConfig>(
  ActionType.LOG_OUT,
  (_request, { extra: { storageApi } }) => {
    storageApi.drop(StorageKey.TOKEN);

    return null;
  }
);

const loadCurrentUser = createAsyncThunk<
  UserAuthResponse,
  undefined,
  AsyncThunkConfig
>(
  ActionType.LOG_IN,
  async (_request, { dispatch, rejectWithValue, extra: { authApi } }) => {
    try {
      return await authApi.getCurrentUser();
    } catch (error) {
      const isHttpError = error instanceof HttpError;

      if (isHttpError && error.status === HttpCode.UNAUTHORIZED) {
        void dispatch(logout());
      }

      return rejectWithValue(
        (error as Error)?.message ?? ExceptionMessage.UNKNOWN_ERROR
      );
    }
  }
);

export { loadCurrentUser, login, logout, register };
