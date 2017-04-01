import * as constants from '../actions/constants';

const initialState = {
    filter: 'SHOW_ALL'
};

export default(state = initialState, action) => {
    switch (action.type) {
    case constants.SET_FILTER:
        return Object.assign({}, state, {
            filter: action.filter
        });
    default:
        return state;
    }
};
