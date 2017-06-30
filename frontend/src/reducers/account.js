import * as constants from '../actions/constants';

const initialState = {
    loggedIn: false,
    username: undefined,
    userToken: undefined,
    error: undefined,
    loading: false,
    todos: []
};

export default(state = initialState, action) => {
    switch (action.type) {
    case constants.LOADING:
        return Object.assign({}, state, {
            loading: true
        });
    case constants.LOG_IN_REQ_SUC:
        return Object.assign({}, state, {
            loggedIn: true,
            username: action.email,
            userToken: action.token,
            todos: action.todos,
            error: false,
            loading:false
        });
    case constants.SIGN_UP_REQ_SUC:
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
    case constants.SIGN_UP_REQ_FAIL:
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
            userToken: action.userToken,
            todos: action.todos
        });
    case constants.ADD_TODO:
        return Object.assign({}, state, {
            loading: false,
            todos: action.todos
        });
    case constants.REMOVE_TODO:
        return Object.assign({}, state, {
            todos: state.todos.filter(item => {
                return item._id !== action.id;
            })
        });
    case constants.TODO_OPERATIONS_ERROR:
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    case constants.ADD_TODO_INFO:
         console.log('add todo info')
        return state;
    case constants.TOGGLE_COMPLETE:
         console.log('toggle completed todo')
        return state;
    case constants.REMOVE_COMPLETE:
         console.log('remove completed todos')
        return state;
    default:
        return state;
    }
};
