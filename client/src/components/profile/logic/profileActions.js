import * as authService from 'src/services/authService';
import { SET_TOKEN } from './profileActionTypes';

export const login = (request) => {
    return async (dispatch, getRootState) => {
        const loginRequest = await authService.login(request);
        const token = await loginRequest.text();
        setToken(token)(dispatch, getRootState);
    }
}

export const setToken = (token) => {
    return async (dispatch, getRootState) => {
        localStorage.setItem('token', token);
        dispatch({
            type: SET_TOKEN,
            token
        });
    }
}

export const registration = (request) => {
    return async (dispatch, getRootState) => {
        const registrationRequest = await authService.registration(request);
        const token = await registrationRequest.text();
        setToken(token)(dispatch, getRootState);
    }
}

export const logout = () => {
    return (dispatch, getRootState) => {
        setToken('')(dispatch, getRootState);
    }
}
