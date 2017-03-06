import * as constants from '../actions/constants';

let storedTodos = localStorage.todos ? JSON.parse(localStorage.todos).todos : undefined;

const initialState = {
    todos: storedTodos || []
};

export default(state = initialState, action) => {
    let todos = [];
    switch (action.type) {
    case constants.ADD_TODO:
        todos = Object.assign({}, state, {
            todos: [
                ...state.todos,
                {
                    text: action.text,
                    completed: false
                }
            ]
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        return todos;
    case constants.REMOVE_TODO:
        todos = Object.assign({}, state, {
            todos: state.todos.filter((item, index) => {
                return index !== action.id;
            })
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        return todos;
    default:
        return state;
    }
};
