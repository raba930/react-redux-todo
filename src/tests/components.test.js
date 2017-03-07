import React from 'react';
import { shallow } from 'enzyme';
import Todo from '../components/elements/todo';

function setup() {
    const props = {
        index: 5,
        todo: {
            text: 'asdf',
            completed: true
        }
    };

    const enzymeWrapper = shallow(<Todo {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('components', () => {
    describe('Todo', () => {
        it('should render self with id and todo text', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('li').contains('asdf'));
        });
    });
});
