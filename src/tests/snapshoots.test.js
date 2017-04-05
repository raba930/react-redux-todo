import React from 'react';
import renderer from 'react-test-renderer';
import Todos from '../components/elements/todos';
import Todo from '../components/elements/todo';

const propSetup = filter => {
    return {
        todos: [{
            text: 'first',
            completed: false
        },{
            text: 'second',
            completed: true
        },{
            text: 'third',
            completed: true
        }],
        filter: filter
    };
};

describe('Todos snapshots', () => {
    test('All todos', () => {
        let props = propSetup('SHOW_ALL');
        const component = renderer.create(<Todos {...props} />)
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Active todos', () => {
        let props = propSetup('SHOW_ACTIVE');
        const component = renderer.create(<Todos {...props} />)
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Todo snapshots', () => {
    test('Completed todo', () => {
        let props = {todo: propSetup().todos[1]};
        const component = renderer.create(<Todo {...props} />)
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Not completed todo', () => {
        let props = {todo: propSetup().todos[0]};
        const component = renderer.create(<Todo {...props} />)
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
