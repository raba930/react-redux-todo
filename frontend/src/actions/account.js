import { API_PREFIX } from '../config';
import $ from 'jquery';
import { ACC_LOADING, LOG_IN_REQ_SUC, LOG_IN_REQ_FAIL, TOKEN_IS_OK, TOKEN_IS_NOT_OK, SIGN_UP_REQ_SUC, SIGN_UP_REQ_FAIL } from '../actions/constants';

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

export const loginSuc = user => {
    return {
        type: LOG_IN_REQ_SUC,
        userToken: user.token
    };
};

export const loginFail = error => {
    return {
        type: LOG_IN_REQ_FAIL,
        error
    };
};

export const loading = () => {
    return {
        type: ACC_LOADING
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

export const signUpSuc = (token, username) => {
    return {
        type: SIGN_UP_REQ_SUC,
        userToken: token,
        username
    };
};

export const signUpFail = error => {
    return {
        type: SIGN_UP_REQ_FAIL,
        error
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
            response => dispatch(tokenIsOk(response.token, response.username)),
            error => dispatch(tokenIsNotOk())
        );
    };
};
