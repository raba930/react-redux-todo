import * as actions from '../actions/todo'
import * as constants from '../actions/constants'

describe('actions', () => {
    it('should create an action to add a todo', () => {
        const text = 'Finish docs';
        const expectedAction = {
            type: constants.ADD_TODO,
            text
        }
        expect(actions.addTodo(text)).toEqual(expectedAction)
    })
    it('should create an action to remove a todo', () => {
        const id = 5;
        const expectedAction = {
            type: constants.REMOVE_TODO,
            id
        }
        expect(actions.removeTodo(id)).toEqual(expectedAction)
    })
})
