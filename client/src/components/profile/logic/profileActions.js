import * as authService from 'src/services/authService';
import { SET_TOKEN, SET_USER, SET_IS_LOADING } from './profileActionTypes';

export const setToken = token => async (dispatch) => {
    localStorage.setItem('token', token);
    dispatch({
        type: SET_TOKEN,
        token
    });
};

export const setUser = user => async dispatch => dispatch({
    type: SET_USER,
    user
});

export const setIsLoading = isLoading => async dispatch => dispatch({
    type: SET_IS_LOADING,
    isLoading
});

const auth = authCallbackPromise => async (dispatch, getRootState) => {
    setIsLoading(true)(dispatch, getRootState);
    const { token, user } = await authCallbackPromise;
    setToken(token)(dispatch, getRootState);
    setUser(user)(dispatch, getRootState);
    setIsLoading(false)(dispatch, getRootState);
};

export const login = request => async (dispatch, getRootState) => {
    auth(authService.login(request))(dispatch, getRootState);
};

export const registration = request => async (dispatch, getRootState) => {
    auth(authService.registration(request))(dispatch, getRootState);
};

export const logout = () => (dispatch, getRootState) => {
    setToken('')(dispatch, getRootState);
    setUser(null)(dispatch, getRootState);
};


export const loadCurrentUser = () => async (dispatch, getRootState) => {
    setIsLoading(true)(dispatch, getRootState);
    const user = await authService.getCurrentUser();
    setUser(user)(dispatch, getRootState);
    setIsLoading(false)(dispatch, getRootState);
};
