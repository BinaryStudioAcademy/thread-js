import { SET_TOKEN, SET_USER, SET_IS_LOADING } from './profileActionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};
