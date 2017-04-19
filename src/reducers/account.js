import * as constants from '../actions/constants';

const initialState = {
    loggedIn: false,
    username: undefined,
    userToken: undefined,
    error: undefined,
    loading: false
};

export default(state = initialState, action) => {
    switch (action.type) {
    case constants.LOG_IN_LOADING:
        return Object.assign({}, state, {
            loading: true
        });
    case constants.LOG_IN_REQ_SUC:
        return Object.assign({}, state, {
            loggedIn: true,
            username: action.email,
            userToken: action.token,
            error: false,
            loading:false
        });
    case constants.LOG_IN_REQ_FAIL:
        return Object.assign({}, state, {
            error: action.error,
            loading:false
        });
    case constants.LOG_OUT:
        return Object.assign({}, state, {
            loggedIn: false,
            username: undefined
        });
    case constants.TOKEN_IS_NOT_OK:
        return Object.assign({}, state, {
            loggedIn: false,
            userToken: undefined
        });
    case constants.TOKEN_IS_OK:
        return Object.assign({}, state, {
            loggedIn: true,
            username: action.username,
            userToken: action.userToken
        });
    default:
        return state;
    }
};
