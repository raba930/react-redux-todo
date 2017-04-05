import reducer from '../reducers/setFilter';
import * as constants from '../actions/constants';

describe('setFilter reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({filter: 'SHOW_ALL'});
    });
    it('should handle SET_FILTER', () => {
        expect(
            reducer({
                filter: constants.SHOW_ALL
            }, {
                type: constants.SET_FILTER,
                filter: constants.SHOW_ACTIVE
            })
        ).toEqual({
            filter : constants.SHOW_ACTIVE
        });
        expect(
            reducer({
                filter: constants.SHOW_ACTIVE
            }, {
                type: constants.SET_FILTER,
                filter: constants.SHOW_ALL
            })
        ).toEqual({
            filter : constants.SHOW_ALL
        });
    });
});
