import getVisibleTodos from '../reducers/getVisibleTodos';
import * as constants from '../actions/constants';

describe('getVisibleTodos', () => {
    const todos = [{
        text: 'first',
        completed: false
    },{
        text: 'second',
        completed: true
    },{
        text: 'third',
        completed: true
    }];
    it('should return all todos', () => {
        expect(
            getVisibleTodos(todos, constants.SHOW_ALL)
        ).toEqual(todos);
    });
    it('should return only first, not completed todo', () => {
        expect(
            getVisibleTodos(todos, constants.SHOW_ACTIVE)
        ).toEqual([{
            text: 'first',
            completed: false
        }]);
    });
});
