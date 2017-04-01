import * as constants from '../actions/constants';

export default(todos, filter) => {
    switch (filter) {
    case constants.SHOW_ALL:
        return todos;
    case constants.SHOW_ACTIVE:
        return todos.filter( todo => !todo.completed );
    default:
        return todos;
    }
};
