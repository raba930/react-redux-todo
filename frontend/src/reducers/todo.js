import * as constants from '../actions/constants';

const initialState = {
    todos: []
};

export default(state = initialState, action) => {
    switch (action.type) {
    case constants.ADD_TODO:
        return Object.assign({}, state, {
            todos: [
                ...state.todos,
                {
                    text: action.text,
                    completed: false,
                    info: ''
                }
            ]
        });
    case constants.ADD_TODO_INFO:
        return Object.assign({}, state, {
            todos: state.todos.map((item, index) => {
                if (index === action.id) item.info = action.todoInfo;
                return item;
            })
        });
    case constants.REMOVE_TODO:
        return Object.assign({}, state, {
            todos: state.todos.filter((item, index) => {
                return index !== action.id;
            })
        });
    case constants.TOGGLE_COMPLETE:
        return Object.assign({}, state, {
            todos: state.todos.map((item, index) => {
                if (index === action.id) {
                    item.completed = !item.completed;
                }
                return item;
            })
        });
    case constants.REMOVE_COMPLETE:
        return Object.assign({}, state, {
            todos: state.todos.filter(item => {
                return item.completed === false;
            })
        });
    default:
        return state;
    }
};
