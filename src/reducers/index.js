import todo from './todo';
import filter from './filter';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    todo,
    filter
});

export default rootReducer;
