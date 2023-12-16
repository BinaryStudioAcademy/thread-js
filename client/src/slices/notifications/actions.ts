import { createAction } from '@reduxjs/toolkit';

import { ActionType } from './common.js';

const joinRoom = createAction<(userId: number) => Record<'payload', number>>(
  ActionType.JOIN_ROOM,
  userId => {
    return {
      payload: userId
    };
  }
);

const leaveRoom = createAction<(userId: number) => Record<'payload', number>>(
  ActionType.LEAVE_ROOM,
  userId => {
    return {
      payload: userId
    };
  }
);

export { joinRoom, leaveRoom };
