import { SET_USER } from './actionTypes';

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isAuthorized: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        isAuthorized: Boolean(action.user?.id),
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
