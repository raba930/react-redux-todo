import { connect } from 'react-redux';
import * as actions from '../../actions/account';
import TodoList from '../views/TodoList';

const mapStateToProps = (state, prop) => {
    return {
        todos: state.account.todos,
        error: state.account.error,
        filter: state.setFilter
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: todo => dispatch(actions.addTodo(todo)),
        removeTodo: id => dispatch(actions.removeTodo(id)),
        toggleComplete: id => dispatch(actions.toggleComplete(id)),
        removeCompleted: () => dispatch(actions.removeCompleted()),
        setFilter: filter => dispatch(actions.setFilter(filter))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
