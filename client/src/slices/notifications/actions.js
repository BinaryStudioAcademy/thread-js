import { createAction } from '@reduxjs/toolkit';

import { ActionType } from './common.js';

const joinRoom = createAction(ActionType.JOIN_ROOM, userId => {
  return {
    payload: userId
  };
});

const leaveRoom = createAction(ActionType.LEAVE_ROOM, userId => {
  return {
    payload: userId
  };
});

export { joinRoom, leaveRoom };
