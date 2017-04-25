import { connect } from 'react-redux';
import * as todoActions from '../../actions/todo';
import Details from '../views/Details';

const mapStateToProps = (state, prop) => {
    const todo = state.todo.todos.find((td, ind) => ind === Number(prop.match.params.id));
    return {
        todo: todo
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addTodoInfo: (id, todoInfo) => dispatch(todoActions.addTodoInfo(id, todoInfo)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
