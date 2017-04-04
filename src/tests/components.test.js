import React from 'react';
import { mount } from 'enzyme';
import Todo from '../components/elements/todo';

function setup(props) {
    const enzymeWrapper = mount(<Todo {...props} />);
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
            const { enzymeWrapper } = setup(props);
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
            const { enzymeWrapper } = setup(props);
            expect(enzymeWrapper.find('li .todo-text').text()).toEqual('asdfg');
            expect(enzymeWrapper.find('li').hasClass('light-blue')).toBe(true);
            expect(enzymeWrapper.find('li').is('#4')).toBe(true);
            expect(enzymeWrapper.find('li .controls .complete i').text()).toEqual('done');
            expect(enzymeWrapper.find('li .controls .remove i').text()).toEqual('delete');
        });
    });
});
