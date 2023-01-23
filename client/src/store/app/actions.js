import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common.js';

const notify = createAsyncThunk(
  ActionType.NOTIFY,
  (payload, { extra }) => {
    const { notification } = extra.services;
    const { type, message } = payload;

    return notification[type](message);
  }
);

export { notify };
