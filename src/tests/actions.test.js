import * as actions from '../actions/todo';
import * as constants from '../actions/constants';

describe('actions', () => {
    it('should create an action to add a todo', () => {
        const text = 'Finish docs';
        const expectedAction = {
            type: constants.ADD_TODO,
            text
        };
        expect(actions.addTodo(text)).toEqual(expectedAction);
    });
    it('should create an action to remove a todo', () => {
        const id = 5;
        const expectedAction = {
            type: constants.REMOVE_TODO,
            id
        };
        expect(actions.removeTodo(id)).toEqual(expectedAction);
    });
    it('should create an action to toggle a todo status', () => {
        const id = 4;
        const expectedAction = {
            type: constants.TOGGLE_COMPLETE,
            id
        };
        expect(actions.toggleComplete(id)).toEqual(expectedAction);
    });
    it('should create an action to remove completed todos', () => {
        const id = 3;
        const expectedAction = {
            type: constants.REMOVE_COMPLETE,
            id
        };
        expect(actions.removeCompleted(id)).toEqual(expectedAction);
    });
    it('should create an action to set new display filter', () => {
        const filter = 'SHOW_ACTIVE';
        const expectedAction = {
            type: constants.SET_FILTER,
            filter
        };
        expect(actions.setFilter(filter)).toEqual(expectedAction);
    });
});
