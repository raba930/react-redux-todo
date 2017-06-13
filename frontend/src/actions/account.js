import { API_PREFIX } from '../config';
import $ from 'jquery';
import * as constants from '../actions/constants';

const sendLoginReq = (username, password) => {
    let props = {
        url: API_PREFIX + '/account/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            username,
            password
        })
    };
    return $.ajax(props);
};

const sendAddTodoReq = todo => {
    let props = {
        url: API_PREFIX + '/todo',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Token': localStorage.accessToken
        },
        data: JSON.stringify({
            todos: [todo]
        })
    };
    return $.ajax(props);
};

const sendRemoveTodoReq = id => {
    let props = {
        url: API_PREFIX + '/todo/' + id,
        method: 'DELETE',
        headers: {
            'Token': localStorage.accessToken
        }
    };
    return $.ajax(props);
};

const sendSignUpReq = (username, password) => {
    let props = {
        url: API_PREFIX + '/account/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            username,
            password
        })
    };
    return $.ajax(props);
};

const sendCheckTokenReq = (token) => {
    let props = {
        url: API_PREFIX + '/account/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            token
        })
    };
    return $.ajax(props);
};

const loginSuc = user => {
    return {
        type: constants.LOG_IN_REQ_SUC,
        todos: user.todos,
        userToken: user.token
    };
};

const loginFail = error => {
    return {
        type: constants.LOG_IN_REQ_FAIL,
        error
    };
};

const loading = () => {
    return {
        type: constants.LOADING
    };
};

const tokenIsOk = (token, username, todos) => {
    return {
        type: constants.TOKEN_IS_OK,
        userToken: token,
        todos,
        username
    };
};

const tokenIsNotOk = () => {
    return {
        type: constants.TOKEN_IS_NOT_OK
    };
};

const signUpSuc = (token, username) => {
    return {
        type: constants.SIGN_UP_REQ_SUC,
        userToken: token,
        username
    };
};

const signUpFail = error => {
    return {
        type: constants.SIGN_UP_REQ_FAIL,
        error
    };
};

export const toggleComplete = id => {
    return {
        type: constants.TOGGLE_COMPLETE,
        id
    };
};
export const removeCompleted = id => {
    return {
        type: constants.REMOVE_COMPLETE,
        id
    };
};
export const setFilter = filter => {
    return {
        type: constants.SET_FILTER,
        filter
    };
};
export const addTodoInfo = (id, todoInfo) => {
    return {
        type: constants.ADD_TODO_INFO,
        id,
        todoInfo
    };
};
const addTodoSuc = todo => {
    return {
        type: constants.ADD_TODO,
        todo
    };
};
const addTodoFail = error => {
    return {
        type: constants.TODO_OPERATIONS_ERROR,
        error: error.statusText
    };
};
const removeTodoSuc = id => {
    return {
        type: constants.REMOVE_TODO,
        id
    };
};
const removeTodoFail = error => {
    return {
        type: constants.TODO_OPERATIONS_ERROR,
        error: error.statusText
    };
};
export const addTodo = todo => {
    return dispatch => {
        dispatch(loading());
        return sendAddTodoReq(todo).then(
            response => dispatch(addTodoSuc(todo)),
            error => dispatch(addTodoFail(error))
        );
    };
};
export const removeTodo = id => {
    return dispatch => {
        dispatch(loading());
        return sendRemoveTodoReq(id).then(
            response => dispatch(removeTodoSuc(id)),
            error => dispatch(removeTodoFail(error))
        );
    };
};
export const tryToLogin = (username, password) => {
    return dispatch => {
        dispatch(loading());
        return sendLoginReq(username, password).then(
            response => dispatch(loginSuc(response)),
            error => dispatch(loginFail(error.statusText))
        );
    };
};
export const tryToSignUp = (username, password) => {
    return dispatch => {
        dispatch(loading());
        return sendSignUpReq(username, password).then(
            response => dispatch(signUpSuc(response.token, response.username)),
            error => dispatch(signUpFail(error.responseJSON.error))
        );
    };
};
export const checkToken = (token) => {
    return dispatch => {
        return sendCheckTokenReq(token).then(
            response => dispatch(tokenIsOk(response.token, response.username, response.todos)),
            error => dispatch(tokenIsNotOk())
        );
    };
};
