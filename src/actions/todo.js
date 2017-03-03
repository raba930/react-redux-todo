import * as constants from '../actions/constants';

export const addTodo = (text) => {
    return {
        type: constants.ADD_TODO,
        text
    };
};
export const removeTodo = (id) => {
    return {
        type: constants.REMOVE_TODO,
        id
    };
};
