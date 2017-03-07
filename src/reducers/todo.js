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
                    completed: false
                }
            ]
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
    default:
        return state;
    }
};
