import * as constants from '../actions/constants';

export const addTodo = text => {
    return {
        type: constants.ADD_TODO,
        text
    };
};
export const removeTodo = id => {
    return {
        type: constants.REMOVE_TODO,
        id
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
