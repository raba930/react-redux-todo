import { connect } from 'react-redux';
import * as todoActions from '../../actions/todo';
import TodoList from '../views/TodoList';

const mapStateToProps = (state, prop) => {
    return {
        todos: state.todo,
        filter: state.setFilter
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: todo => dispatch(todoActions.addTodo(todo)),
        removeTodo: id => dispatch(todoActions.removeTodo(Number(id))),
        toggleComplete: id => dispatch(todoActions.toggleComplete(Number(id))),
        removeCompleted: () => dispatch(todoActions.removeCompleted()),
        setFilter: filter => dispatch(todoActions.setFilter(filter))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
