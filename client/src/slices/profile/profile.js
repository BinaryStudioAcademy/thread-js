import { loadCurrentUser, login, logout, register } from './actions.js';
import { actions } from './profile.slice.js';

const allActions = {
  ...actions,
  login,
  register,
  logout,
  loadCurrentUser
};

export { allActions as actions };
export { reducer } from './profile.slice.js';
