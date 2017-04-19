import { API_PREFIX } from '../config';
import $ from 'jquery';
import { LOG_IN_LOADING, LOG_IN_REQ_SUC, LOG_IN_REQ_FAIL, TOKEN_IS_OK, TOKEN_IS_NOT_OK } from '../actions/constants';

const sendLoginReq = (username, password) => {
    let props = {
        url: API_PREFIX + '/api/login',
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
        url: API_PREFIX + '/api/token',
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


export const loginSuc = user => {
    return {
        type: LOG_IN_REQ_SUC,
        userToken: user.token
    };
};

export const loginFail = err => {
    return {
        type: LOG_IN_REQ_FAIL,
        error: err
    };
};

export const loginLoading = isLoading => {
    return {
        type: LOG_IN_LOADING
    };
};

export const tokenIsOk = (token, username) => {
    return {
        type: TOKEN_IS_OK,
        userToken: token,
        username
    };
};

export const tokenIsNotOk = () => {
    return {
        type: TOKEN_IS_NOT_OK
    };
};

export const tryToLogin = (username, password) => {
    return function (dispatch) {
        dispatch(loginLoading());
        return sendLoginReq(username, password).then(
            response => dispatch(loginSuc(response)),
            error => dispatch(loginFail(error.statusText))
        );
    };
};

export const checkToken = (token) => {
    return function (dispatch) {
        return sendCheckTokenReq(token).then(
            response => dispatch(tokenIsOk(response.token, response.username)),
            error => dispatch(tokenIsNotOk())
        );
    };
};
