import todo from './todo';
import setFilter from './setFilter';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    todo,
    setFilter
});

export default rootReducer;
