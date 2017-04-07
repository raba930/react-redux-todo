import React from 'react';
import { mount } from 'enzyme';
import Todo from '../components/elements/todo';
import Todos from '../components/elements/todos';
import Details from '../components/views/Details';
import { MemoryRouter } from 'react-router-dom';

function todoSetup(props) {
    const enzymeWrapper = mount(<MemoryRouter><Todo {...props} /></MemoryRouter>);
    return {
        props,
        enzymeWrapper
    };
}
function todosSetup(props) {
    const enzymeWrapper = mount(<MemoryRouter><Todos {...props} /></MemoryRouter>);
    return {
        props,
        enzymeWrapper
    };
}
function DetailsSetup(props) {
    const enzymeWrapper = mount(<MemoryRouter><Details {...props} /></MemoryRouter>);
    return {
        props,
        enzymeWrapper
    };
}
describe('components', () => {
    describe('Todo', () => {
        it('Complete todo item', () => {
            const props = {
                index: 5,
                todo: {
                    text: 'asdf',
                    completed: true
                }
            };
            const { enzymeWrapper } = todoSetup(props);
            expect(enzymeWrapper.find('li .todo-text').text()).toEqual('asdf');
            expect(enzymeWrapper.find('li').hasClass('light-green')).toBe(true);
            expect(enzymeWrapper.find('li').is('#5')).toBe(true);
            expect(enzymeWrapper.find('li .controls .complete i').text()).toEqual('restore');
            expect(enzymeWrapper.find('li .controls .remove i').text()).toEqual('delete');
        });
        it('Not complete todo item', () => {
            const props = {
                index: 4,
                todo: {
                    text: 'asdfg',
                    completed: false
                }
            };
            const { enzymeWrapper } = todoSetup(props);
            expect(enzymeWrapper.find('li .todo-text').text()).toEqual('asdfg');
            expect(enzymeWrapper.find('li').hasClass('light-blue')).toBe(true);
            expect(enzymeWrapper.find('li').is('#4')).toBe(true);
            expect(enzymeWrapper.find('li .controls .complete i').text()).toEqual('done');
            expect(enzymeWrapper.find('li .controls .remove i').text()).toEqual('delete');
        });
    });
    describe('Todos', () => {
        it('Should render exactly two todo components', () => {
            const props = {
                todos: [{
                    text: 'asdf',
                    completed: true
                }, {
                    text: 'ddf',
                    completed: false
                }],
                filter: 'SHOW_ALL'
            };
            const { enzymeWrapper } = todosSetup(props);
            expect(enzymeWrapper.find('ul').children().nodes.length).toEqual(2);
        });
        it('Should render only active todos', () => {
            const props = {
                todos: [{
                    text: 'asdf',
                    completed: true
                }, {
                    text: 'ddf',
                    completed: false
                }],
                filter: 'SHOW_ACTIVE'
            };
            const { enzymeWrapper } = todosSetup(props);
            expect(enzymeWrapper.find('ul').children().nodes.length).toEqual(1);
            expect(enzymeWrapper.find('ul li .todo-text').text()).toEqual('ddf');
        });
    });
    describe('Details', () => {
        const todo_text = 'abc';
        const todo_info = 'dfg';
        const props = completed => {
            return {
                match: {
                    params: {
                        id: 3
                    }
                },
                todo: {
                    text: todo_text,
                    info: todo_info,
                    completed: completed
                },
                addTodoInfo: () => {},
                history: {push:() => {}}
            };
        };
        it('Should render details page with todo name & description within textarea', () => {
            const { enzymeWrapper } = DetailsSetup(props(false));
            expect(enzymeWrapper.find('h3 .todo-text').text()).toEqual(todo_text);
            expect(enzymeWrapper.find('textarea').text()).toEqual(todo_info);
            expect(enzymeWrapper.find('button').nodes.length).toEqual(2);
        });
        it('Should render details page with done icon', () => {
            const { enzymeWrapper } = DetailsSetup(props(true));
            expect(enzymeWrapper.find('h3 .done-icon').text()).toEqual('done');
        });
    });
});
