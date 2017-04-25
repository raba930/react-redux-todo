import reducer from '../reducers/todo';
import * as constants from '../actions/constants';

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({todos: []});
    });
    it('should handle ADD_TODO', () => {
        expect(
            reducer(undefined, {
                type: constants.ADD_TODO,
                text: 'Run the tests'
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: false,
            info: ''
        }]});
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: false,
                info: ''
            }]}, {
                type: constants.ADD_TODO,
                text: 'Run the tests again'
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: false,
            info: ''
        }, {
            text: 'Run the tests again',
            completed: false,
            info: ''
        }]});
    });
    it('should handle REMOVE_TODO', () => {
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: false,
                info: ''
            }, {
                text: 'Run the tests again',
                completed: false,
                info: ''
            }]}, {
                type: constants.REMOVE_TODO,
                id: 1
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: false,
            info: ''
        }]});
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: false,
                info: ''
            }]}, {
                type: constants.REMOVE_TODO,
                id: 0
            })
        ).toEqual({todos: []});
    });
    it('should handle TOGGLE_COMPLETE', () => {
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: true,
                info: ''
            }, {
                text: 'Run the tests again',
                completed: false,
                info: ''
            }]}, {
                type: constants.TOGGLE_COMPLETE,
                id: 1
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: true,
            info: ''
        }, {
            text: 'Run the tests again',
            completed: true,
            info: ''
        }]});
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: true,
                info: ''
            }, {
                text: 'Run the tests again',
                completed: true,
                info: ''
            }]}, {
                type: constants.TOGGLE_COMPLETE,
                id: 0
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: false,
            info: ''
        }, {
            text: 'Run the tests again',
            completed: true,
            info: ''
        }]});
    });
    it('should handle ADD_TODO_INFO', () => {
        expect(
            reducer({todos: [{
                text: 'Run the tests',
                completed: true,
                info: ''
            }, {
                text: 'Run the tests again',
                completed: false,
                info: ''
            }]}, {
                type: constants.ADD_TODO_INFO,
                id: 1,
                todoInfo: 'asd'
            })
        ).toEqual({todos: [{
            text: 'Run the tests',
            completed: true,
            info: ''
        }, {
            text: 'Run the tests again',
            completed: false,
            info: 'asd'
        }]});
    });
});
