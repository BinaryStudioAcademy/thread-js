import { LOGIN_ACTION } from './loginActionTypes';
import * as authService from 'src/services/authService';

export const login = (request) => {
    return async (dispatch) => {
        const loginRequest = await authService.login(request);
        const user = await loginRequest.text();
        localStorage.setItem('token', user);
        dispatch({
            type: LOGIN_ACTION,
            user
        })
    }
}


