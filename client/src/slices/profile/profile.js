import { login, register, logout, loadCurrentUser } from './actions';
import { actions } from './profile.slice';

const allActions = {
  ...actions,
  login,
  register,
  logout,
  loadCurrentUser
};

export { allActions as actions };
export { reducer } from './profile.slice';
