import { LOGIN_ACTION } from "./loginActionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return {
                user: action.user
            }
        default:
            return state
    }
}
