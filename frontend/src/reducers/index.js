import account from './account';
import setFilter from './setFilter';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account,
    setFilter
});

export default rootReducer;
