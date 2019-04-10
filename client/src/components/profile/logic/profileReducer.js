export default (state = {}, action) => {
    switch (action.type) {
        case 'PROFILE_ACTION':
            return {
                result: action.payload
            }
        default:
            return state
    }
}
