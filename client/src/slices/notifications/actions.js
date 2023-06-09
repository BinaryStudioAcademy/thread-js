import { createAction } from '@reduxjs/toolkit';

import { ActionType } from './common';

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
