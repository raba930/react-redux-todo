import reducer from '../reducers/todo'
import * as constants from '../actions/constants'

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({todos: []})
    });
    it('should handle ADD_TODO', () => {
        expect(
            reducer(undefined, {
                type: constants.ADD_TODO,
                text: 'Run the tests'
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: false
        }]})
    });
    expect(
        reducer({todos: [{
            text: 'Run the tests',
            completed: false
        }]}, {
            type: constants.ADD_TODO,
            text: 'Run the tests again'
        })
    ).toEqual({todos: [{
            text: 'Run the tests',
            completed: false
        }, {
            text: 'Run the tests again',
            completed: false
        }]
    });
    it('should handle REMOVE_TODO', () => {
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: false
            }, {
                text: 'Run the tests again',
                completed: false
            }]}, {
                type: constants.REMOVE_TODO,
                id: 1
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: false
        }]});
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: false
            }]}, {
                type: constants.REMOVE_TODO,
                id: 0
            })
        ).toEqual({todos: []});
    });
})
