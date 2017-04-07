import React from 'react';
import renderer from 'react-test-renderer';
import Todos from '../components/elements/todos';
import Todo from '../components/elements/todo';
import Details from '../components/views/Details';
import { MemoryRouter } from 'react-router-dom';

const propSetup = filter => {
    return {
        todos: [{
            text: 'first',
            completed: false,
            info: 'f'
        },{
            text: 'second',
            completed: true,
            info: 's'
        },{
            text: 'third',
            completed: true,
            info: 't'
        }],
        filter: filter
    };
};

describe('Todos snapshots', () => {
    test('All todos', () => {
        let props = propSetup('SHOW_ALL');
        const component = renderer.create(<MemoryRouter><Todos {...props} /></MemoryRouter>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Active todos', () => {
        let props = propSetup('SHOW_ACTIVE');
        const component = renderer.create(<MemoryRouter><Todos {...props} /></MemoryRouter>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Todo snapshots', () => {
    test('Completed todo', () => {
        let props = {todo: propSetup().todos[1]};
        const component = renderer.create(<MemoryRouter><Todo {...props} /></MemoryRouter>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Not completed todo', () => {
        let props = {todo: propSetup().todos[0]};
        const component = renderer.create(<MemoryRouter><Todo {...props} /></MemoryRouter>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Details snapshots', () => {
    test('Completed todo', () => {
        let props = {todo: propSetup().todos[1]};
        const component = renderer.create(<MemoryRouter><Details {...props} /></MemoryRouter>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Not completed todo', () => {
        let props = {todo: propSetup().todos[0]};
        const component = renderer.create(<MemoryRouter><Details {...props} /></MemoryRouter>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
