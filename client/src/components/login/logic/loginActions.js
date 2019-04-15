import { LOGIN_ACTION } from './loginActionTypes';
import * as authService from 'src/services/authService';

export const login = (request) => {
    return async (dispatch) => {
        const user = await authService.login(request);
        dispatch({
            type: LOGIN_ACTION,
            user
        })
    }
}


