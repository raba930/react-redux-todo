import todo from './todo';
import account from './account';
import setFilter from './setFilter';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    todo,
    account,
    setFilter
});

export default rootReducer;
